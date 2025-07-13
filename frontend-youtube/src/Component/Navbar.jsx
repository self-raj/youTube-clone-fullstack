import { GrMenu } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { IoMicSharp } from "react-icons/io5";
import { MdClose, MdVideoCall } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { MdPerson } from "react-icons/md";

import "../style/SpecialFont.css";
import { useContext, useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import Login from "./Login";
import { SidebarContext } from "./SidebarContext";
// props ko catch kiya gya hai memu handle kaerne ke liye
function Navbar() {
  const { sideNavbar,setSideNavbar } = useContext(SidebarContext);

  const Navigate = useNavigate();
  const [query, setQuery] = useState(""); //search ka state
  const [showModal, setShowModal] = useState(false); //mobile screen me search ka state

  // user profile setup
  const [userPic, setUserPic] = useState(null);

  const [token, setToken] = useState(null);

  //  drop down
  const [NavbarModal, setNavbarModel] = useState(false);
  //   ==========
  const [login, setLogin] = useState(false);
  // =============
  const[userId,setUserid]=useState(null)

  function handleDropDown() {
    setNavbarModel(!NavbarModal);
  }
  //   -------
  // menu par click karne par side close open hoga
  function handleSideBar() {
    setSideNavbar(!sideNavbar);
  }
  //   =====================
  
  // =====================
  function onClickUpOption(button) {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else if (button === "logout") {
      //  Remove token and profile from localStorage
      localStorage.clear();
      setTimeout(() => {
        Navigate("/");
        window.location.reload();
      }, 1000);
    }
  }

  function closeLoginModel() {
    setLogin(false);
  }

  // login ke profile show karega
  useEffect(() => {
    const userInfo = localStorage.getItem("profile")?.replace(/['"]+/g, "");
    const userId = localStorage.getItem("userId");
    setUserid(userId)
    // console.log(userInfo, "navbar user info");

    setUserPic(userInfo); //  Now only the image URL goes to img src

    const localToken = localStorage.getItem("token");
    setToken(localToken);
    setNavbarModel(false);
  }, [login]);

  //search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowModal(false);
    Navigate(`/search?q=${query}`);
  };

  return (
    <>
      <div className=" h-14  p-0 md:p-2  flex w-full bg-black justify-between z-10 fixed top-0 md:px-[20px]">
        {/* <div className=" h-14 px-2.5 py-4 flex w-full bg-black justify-between z-10 fixed top-0 md:pl-[250px]"> */}
        {/* menu btn */}
        <div className="flex gap-2.5 justify-center w-fit  items-center">
          <div
            onClick={handleSideBar}
            className="text-white cursor-pointer w-10 h-10 flex text-2xl justify-center items-center  "
          >
            <GrMenu />
          </div>
          {/* youtube icon   */}

          <Link
            to="/"
            className=" flex justify-center items-center text-white "
          >
            <span className="text-3xl text-[#FF0000]">
              <IoLogoYoutube />
            </span>
            <div className=" text-[23px] whitespace-normal  lora font-normal">
              YouTube
            </div>
          </Link>
        </div>
        {/* ----------- search style------------ */}
        {/* ----------- search style------------ */}
        <div className="   flex   gap-2.5 md:w-[40%] justify-center items-center">
        

          <form
            onSubmit={handleSearch}
            className="w-full flex justify-center items-center relative"
          >
            <div className="w-full flex justify-end">
              {/* Input (visible only on md and above) */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className=" search_box  h-10 rounded-tl-[20px] rounded-bl-[20px] text-white pl-8 focus:outline-none border border-[#e6e5e560] bg-[#121212] w-full"
              />

              {/* Search Icon */}
              <div
                
                className="search_icon2 text-white flex justify-center items-center md:bg-[#414141] cursor-pointer md:rounded-tr-[20px] md:rounded-br-[20px] md:px-4 h-12 w-12 md:h-auto px-7"
              >
                <button type="submit" className="text-2xl">
                    <IoSearchSharp />
                  </button>
              </div>
            </div>
          </form>

          {/* === Mobile Modal Popup for search === */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center  z-50">
              <div className=" p-6 rounded-xl w-[90%] max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-xl">Search</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white text-2xl"
                  >
                    <MdClose />
                  </button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Type to search..."
                    className="w-full px-4 py-2 rounded bg-[#121212] border border-gray-600 text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#494747] text-white rounded font-semibold"
                  >
                    <IoSearchSharp />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* profile bell-icon video */}
        <div className=" flex text-white justify-center items-center md:gap-5 gap-2 relative ">
          <div
            onClick={() => {
              if (window.innerWidth < 768) setShowModal(true);
            }}
            className="search_icon text-white  md:bg-[#414141] cursor-pointer md:rounded-tr-[20px] md:rounded-br-[20px]"
          >
            <span className="text-2xl">
              <IoSearchSharp />
            </span>
          </div>
          <Link to={`/${userId}/upload`}>
            <span className="text-2xl cursor-pointer">
              <MdVideoCall />
            </span>
          </Link>
          <span className="text-[20px] cursor-pointer">
            <BsBellFill />
          </span>
          <div
            onClick={handleDropDown}
            className="cursor-pointer flex justify-end"
          >
            {token ? (
              <img src={userPic} alt="user" className="rounded-full w-7 h-7" />
            ) : (
              <div
                onClick={() => onClickUpOption("login")}
                className="border p-1 md:px-2 rounded hover:bg-white hover:text-black transition-all duration-300"
              >
                SignIn
              </div>
            )}
          </div>

          {/* drop down  */}
          {NavbarModal && (
            <div className="absolute top-9 w-full z-40 text-white ">
              {/* Show only if logged in */}
              {token && (
                <>
                  
                  <div
                    className=" bg-[#585757] p-2 hover:bg-[gray]"
                    onClick={() => onClickUpOption("logout")}
                  >
                    Logout
                  </div>
                </>
              )}

            </div>
          )}
        </div>
        {/* login ka modal open hoga  */}
        {login && <Login closeLoginModel={closeLoginModel} />}
      </div>
    </>
  );
}

export default Navbar;
