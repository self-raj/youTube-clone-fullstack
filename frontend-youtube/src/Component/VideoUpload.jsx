import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { IoLogoYoutube } from "react-icons/io5";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
function VideoUpload() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // if user not login user not upload video
  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (!isLogin) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  //video upload from handle
  const [inputVideo, setinputVideo] = useState({
    title: "",
    desc: "",
    thumbnail: "",
    videoUrl: "",
    videoCategory: "",
  });
  // console.log(inputVideo);


  if (isAuthenticated === null) {
    return <div className="text-white mt-50">Loading...</div>;
  }
  function handleVideoFiled(e) {
    const { name, value } = e.target;
    // console.log(name,value);

    setinputVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // upload video with login user
  async function handleVideoUpload() {
    const token = localStorage.getItem("token");
    await axios
      .post("http://localhost:8080/video", inputVideo, {
        headers: {
          Authorization: `JWT ${token}`, 
        },
      })
      .then((response) => {
        console.log("upload video", response);
        toast.success(response?.data?.message);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("All field required");
        }
        console.log(err, "error");
      });
  }

  return (
    <>
      <Navbar />
      <div className=" bg-black text-white mt-[56px] flex flex-col items-center h-[92vh]  p-4 md:p-0 font-normal ">
        <div className=" md:w-[45%] mt-5 md:p-6 p-2  rounded-xl  border  shadow-[1px_0px_10px_white]    ">
          <div className=" text-[red] flex items-center  w-full justify-center  gap-2">
            <span className="text-4xl">
              {" "}
              <IoLogoYoutube />
            </span>
            <span className="text-white font-bold text-2xl">UploadVideo</span>
          </div>
          {/* upload from and video */}

          <div className=" flex gap-8 mt-[30px] items-center flex-col">
            <input
              value={inputVideo.title}
              onChange={(e) => handleVideoFiled(e)}
              name="title"
              className="md:w-[75%]  h-11 px-5 text-white bg-[#3f3f3f] focus:outline-none border-none rounded-sm"
              type="text"
              placeholder="Title of Video"
            />
            <input
              value={inputVideo.desc}
              onChange={(e) => handleVideoFiled(e)}
              name="desc"
              className="md:w-[75%]  h-11 px-5 text-white bg-[#3f3f3f] focus:outline-none border-none rounded-sm"
              type="text"
              placeholder="Description"
            />
            <input
              value={inputVideo.videoCategory}
              onChange={(e) => handleVideoFiled(e)}
              name="videoCategory"
              className="md:w-[75%]  h-11 px-5 text-white bg-[#3f3f3f] focus:outline-none border-none rounded-sm"
              type="text"
              placeholder="Category"
            />
            <div className=" flex flex-col  justify-center items-center gap-3 md:w-[100%]  ">
              <div className=" ">
                <input
                  name="thumbnail"
                  value={inputVideo.thumbnail}
                  onChange={(e) => handleVideoFiled(e)}
                  className=" bg-[#3f3f3f] w-[100%]  text-white py-2 rounded pl-5"
                  type="text"
                  placeholder="Thumbnail"
                />
              </div>
              <div className=" ">
                <input
                  placeholder=" Video"
                  value={inputVideo.videoUrl}
                  onChange={(e) => handleVideoFiled(e)}
                  className=" bg-[#3f3f3f] w-[100%]  text-white py-2 rounded pl-5"
                  type="text"
                  name="videoUrl"
                />
              </div>
            </div>
          </div>

          <div className=" flex justify-center items-center gap-3 mt-5">
            <div className=" px-5 outline-1 py-2 rounded  hover:bg-white hover:text-black cursor-pointer">
              <button onClick={handleVideoUpload}>Uploads</button>
            </div>
            <Link
              to="/"
              className=" px-5 outline-1 py-2 rounded  hover:bg-white hover:text-black cursor-pointer"
            >
              <button>Home</button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default VideoUpload;
