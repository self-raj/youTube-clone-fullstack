import { IoMdHome } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { MdRecentActors } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdPlaylistPlay } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { MdOutlineContentCut } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "./SidebarContext";

function SideNavbar() {
  const { sideNavbar, setSideNavbar } = useContext(SidebarContext);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// On resize, detect mobile or desktop
useEffect(() => {
  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Auto close on mobile
    if (mobile) {
      setSideNavbar(false);
    } else {
      setSideNavbar(true); // Auto open on desktop
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [setSideNavbar])
 const sidebarClass = sideNavbar ? "translate-x-0" : "-translate-x-full";

  return (
   
    <div
      className={`
    fixed top-14 left-0 z-50 w-[270px] h-[calc(100vh-56px)] bg-black text-white
    overflow-y-auto hide-scrollbar p-4 transition-transform duration-300 transform
    ${sidebarClass}
  `}
    >
      <div className="flex  flex-col">
        <Link
          to="/"
          className=" flex  items-center  p-2  hover:bg-[gray] rounded-xl mb-3 bg-[gray]  "
        >
          <div className="flex cursor-pointer justify-center gap-3 items-center">
            <span className=" text-2xl">
              <IoMdHome />
            </span>
            <div className=" text-[15px]">Home</div>
          </div>
        </Link>
        {/* ---------- */}
        <div className=" flex  items-center  p-2  hover:bg-[gray] rounded-xl mb-3 ">
          <div className="flex cursor-pointer justify-center gap-3 items-center">
            <span className=" text-2xl">
              <MdOutlineVideoCall />
            </span>
            <div className=" text-[15px]">Shorts</div>
          </div>
        </div>
        {/* ================= */}
        <div className=" flex  items-center  p-2  hover:bg-[gray] rounded-xl mb-3 ">
          <div className="flex cursor-pointer justify-center gap-3 items-center">
            <span className=" text-2xl">
              <MdOutlineSubscriptions />
            </span>
            <div className=" text-[15px]">Shorts</div>
          </div>
        </div>
      </div>

      <hr />

      <div className="  rounded-xl mt-2 py-2.5">
        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2  py-2 rounded-2xl hover:bg-[gray]">
          <div className=" text-[15px]">You</div>
          <span className=" text-md">
            <FaAngleRight />
          </span>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <MdRecentActors />
          </span>
          <div className=" text-[15px]">Your Channel</div>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <FaHistory />
          </span>
          <div className=" text-[15px]">History</div>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <MdPlaylistPlay />
          </span>
          <div className=" text-[15px]">Playlists</div>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <GoVideo />
          </span>
          <div className=" text-[15px]">Your video</div>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <MdOutlineWatchLater />
          </span>
          <div className=" text-[15px]">Watch later</div>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <BiLike />
          </span>
          <div className=" text-[15px]">Liked video</div>
        </div>

        <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
          <span className=" text-2xl">
            <MdOutlineContentCut />
          </span>
          <div className=" text-[15px]">Your clips</div>
        </div>
        <hr />
      </div>

      {/* ======== */}
      <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
        <div className=" text-[15px] font-bold">Subscriptions</div>
      </div>

      <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[gray]">
        {/* <div className=" text-[15px]">Aaj Tak</div> */}
        <span className=" text-2xl">
          <img
            className="w-6 h-6 rounded-full"
            src="data:image/png;base64,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"
            alt=""
          />
        </span>{" "}
        Aaj Tak
      </div>
      <hr />
    </div>
  );
}

export default SideNavbar;
