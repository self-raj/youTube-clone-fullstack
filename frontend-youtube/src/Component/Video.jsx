import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import SideNavbar from "./SideNavbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IoMdShareAlt } from "react-icons/io";
import { SidebarContext } from "./SidebarContext";
import { TfiDownload } from "react-icons/tfi";

function Video() {
  const [fetchData, setFetchData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [profile, setProfile] = useState("");
  const [comment, setComment] = useState([]); //comment show karne ke liye sate create kiya gya hai
  const [loggedInUserId, setLoggedInUserId] = useState(""); //login user ko edit delet ka option milega
  const [editedMessage, setEditedMessage] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id } = useParams();
  const { sideNavbar, setSideNavbar } = useContext(SidebarContext);

  async function fetchVideoById() {
    axios
      .get(`http://localhost:8080/getVideoId/${id}`)
      .then((response) => {
        setFetchData(response?.data?.singleVideo);
        setVideoUrl(response?.data?.singleVideo?.videoUrl); //single video show particular page not maping this video
        // console.log(response,"fetch data");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(fetchData, "fetchdatcommenturl");

  async function getCommentByvideoId() {
    axios
      .get(`http://localhost:8080/comment/${id}`)
      .then((response) => {
        // console.log("comment", response.data.comments);
        setComment(response?.data?.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchVideoById(); //this funtion call single video with id
    getCommentByvideoId();
  }, [id]);
  const [message, setMessage] = useState("");

  //   console.log(sideNavbar,sidebarFun);
  // dynemic id fetch with useparams

  async function handleComment() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to comment");
      return;
    }

    const commentData = {
      video: id,
      message,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/comment",
        commentData,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setMessage("");

      //  Use full comment from response (with populated user)
      setComment((prev) => [...prev, response.data.comment]);
    } catch (err) {
      console.error("Comment error", err);
      toast.error(
        err.response?.data?.message || "Failed to comment. Try again."
      );
    }
  }

  // =======================================================
  // login user ko option milega delete edit ka
  useEffect(() => {
    const userId = localStorage.getItem("userId")?.replace(/['"]+/g, "");
    setLoggedInUserId(userId);
    const profile = localStorage.getItem("profile")?.replace(/['"]+/g, "");
    setProfile(profile);
  }, []);

  // ==============================================================
  const handleDelete = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:8080/comment/${commentId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      // Remove comment from UI
      setComment((prevComments) =>
        prevComments.filter(
          (comment) => comment._id.toString() !== commentId.toString()
        )
      );

      toast.success("Comment deleted");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    }
  };
  //
  // edit comment logic
  const handleEdit = (comment) => {
    setEditCommentId(comment._id);
    setEditedMessage(comment.message);
  };
  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:8080/edit-comment/${id}`,
        { message: editedMessage },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      toast.success("Comment updated successfully");

      setEditCommentId(null);
      // Refresh comments
      const updated = comment.map((c) =>
        c._id === id ? { ...c, message: editedMessage } : c
      );
      setComment(updated);
    } catch (err) {
      alert("Failed to update");
      console.log(err.response?.data || err.message);
    }
  };

  const suggestedVideos = [
    {
      id: 2,
      title: "Learn JavaScript in 1 Hour",
      thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
      channel: "Mosh Hamedani",
      views: "1.5M",
    },
    {
      id: 3,
      title: "Tailwind CSS Full Course",
      thumbnail: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
      channel: "Traversy Media",
      views: "1.5M",
    },
    {
      id: 4,
      title: "Node.js Crash Course",
      thumbnail: "https://i.ytimg.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
      channel: "FreeCodeCamp",
      views: "1.5M",
    },
  ];
  // On resize, detect mobile or desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto close on mobile
      if (mobile) {
        setSideNavbar(false);
      } else {
        setSideNavbar(false); // Auto open on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSideNavbar]);
  return (
    <>
      <Navbar />

      <SideNavbar sideNavbar={sideNavbar} />
      <div className="mt-[55px]  sm:flex justify-center py-[30px] md:px-5 px-2 bg-black">
        <div className="w-full max-w-5xl flex flex-col">
          <div className="w-full  ">
            {/* if fetchData me data hai to ki video play hoga */}

            {fetchData && (
              <video
                className="w-full   border rounded-xl "
                controls
                autoPlay
                muted
              >
                <source src={`${videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {/* user  desc comment */}

          <div className="">
            <div className="text-white flex flex-col text-xl font-semibold mb-8">
              {fetchData?.title}
            </div>
            <div className="flex  justify-between gap-3 mt-2.5 flex-wrap">
              <div className="flex gap-3.5  items-center cursor-pointer">
                <Link
                  to={`/user/${fetchData?.user?._id}`}
                  className="flex gap-4"
                >
                  {/* profile image */}
                  <div>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={fetchData?.user?.profileUrl}
                      alt=""
                    />
                  </div>

                  <div className="">
                    {/* channel name */}
                    <div className="text-white font-bold">
                      {fetchData?.user?.channelName}
                    </div>
                    <div className="text-[gray]">{`1.5k Subcribers`}</div>
                  </div>
                </Link>

                <div className=" flex justify-center items-center ">
                  <div className=" bg-[white] text-black md:px-7 py-2 px-7 rounded-4xl font-semibold md:text-xx md:font-semibold  md:py-3  flex justify-center items-center md:rounded-4xl">
                    <button className="cursor-pointer">Subscribe</button>
                  </div>
                </div>
              </div>

              <div className="flex md:gap-6 gap-3 flex-wrap">
                <div className="flex gap-2.5 ">
                  <div className="cursor-pointer hover:text-black hover:bg-white transition-all duration-300 text-white border flex justify-center items-center px-6 py-2    rounded-full  ">
                    <span className="pr-1 text-2xl ">
                      <IoMdShareAlt />
                    </span>
                    Share
                  </div>
                  <div className="cursor-pointer hover:text-black hover:bg-white transition-all duration-300 text-white border flex justify-center items-center  px-6 py-2    rounded-full">
                    <span className="pr-1 text-2xl ">
                      <TfiDownload />
                    </span>
                    Download
                  </div>
                </div>
                <div className="text-white flex gap-x-2.5 md:text-xl justify-center items-center bg-[#a5a5a538] py-2  md:px-2 rounded-2xl">
                  <div className="flex items-center justify-center gap-2 px-2 cursor-pointer ">
                    <BiLike />
                    <div className="">{fetchData?.like}</div>
                  </div>

                  <div className="w-0 h-[20px]  border "></div>

                  <div className=" cursor-pointer flex justify-center items-center gap-2 px-2 ">
                    <div className="">{fetchData?.dislike}</div>
                    <div>
                      <BiDislike />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* description section */}
            <div className="flex flex-col w-full p-4  mt-5 rounded-xl text-white bg-[#a5a5a538]">
              <div className="font-medium">
                {fetchData?.createdAt.slice(0, 10)}
              </div>
              {/* description */}
              <div className="text-sm font-normal">{fetchData?.desc}</div>
            </div>
            {/* comment section */}
            <div className="flex flex-col w-full md:p-4  p-1  md:mt-5  rounded-xl text-white">
              <div className="font-medium">{`${comment.length}  Comments`}</div>
              <div className="flex mt-3 ">
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    profile
                      ? profile
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                />
                <div className=" w-full  bg-transparent">
                  <input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className=" border-b w-full pb-3 focus:outline-none pl-4"
                    type="text"
                    placeholder="Add a comment…"
                  />
                  {/* cancle and submit button */}
                  <div className="flex justify-end mt-3 text-black gap-5">
                    <div className="text-white hover:bg-[white] hover:text-[black]  outline-1 px-4 py-1 rounded-3xl font-semibold">
                      <button>Cancel</button>
                    </div>
                    <div className=" text-white hover:bg-[white] hover:text-[black]  outline-1 px-4 py-1 rounded-3xl font-semibold">
                      <button onClick={handleComment}>Comment</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* user send massage show here */}

              {comment.map((comment, index) => (
                <div key={index} className="flex gap-4 mt-4">
                  <div className="w-[45px]">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        comment?.user?.profileUrl
                          ? comment.user.profileUrl
                          : "https://via.placeholder.com/40x40.png?text=User"
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-[170px]">
                    <div className="flex gap-3 flex-wrap ">
                      <div className="text-sm text-[#aaaaaa]">
                        {comment?.user?.userName}
                      </div>
                      <div className="text-[14px] text-[#aaaaaa]">
                        {comment?.createdAt?.slice(0, 10)}
                      </div>
                    </div>

                    {/*  Show Edit/Delete if comment is by logged in user */}

                    <div className="mt-1  md:w-[230px]">{comment?.message}</div>
                  </div>
                  {comment?.user?._id === loggedInUserId && (
                    <div className="flex gap-2 mt-2 w-full justify-end items-center">
                      {editCommentId === comment._id ? (
                        <div className="flex flex-col gap-2">
                          <div className=" border-b-1">
                            <input
                              className="border px-2 py-1 text-white outline-none border-none 
                             rounded w-full"
                              value={editedMessage}
                              onChange={(e) => setEditedMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdate(comment._id)}
                              className="text-green-500 hover:underline"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setEditCommentId(null)}
                              className="text-gray-400 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            className="text-blue-400 hover:underline"
                            onClick={() => handleEdit(comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-400 hover:underline"
                            onClick={() => handleDelete(comment._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* video suggestions */}
        <div className="w-full max-w-[406px] flex flex-col py-2.5 px-4 gap-2.5">
          <div className=" text-white">
            <div className=" space-y-4">
              <h3 className="text-lg font-semibold mb-2">Suggested Videos</h3>
              {suggestedVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
                >
                  <img
                    src={video.thumbnail}
                    alt="thumbnail"
                    className="w-42 h-28 rounded-md object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{video.title}</p>
                    <p className="text-gray-400">{video.channel}</p>
                    <p className="text-gray-400">{video.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Video;
