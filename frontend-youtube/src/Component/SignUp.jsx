import { useState } from "react";
import Navbar from "./Navbar";
import { IoLogoYoutube } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function SignUp() {
  const navigate =useNavigate()
  const [signUpField, setSignupField] = useState({
    channelName: "",
    userName: "",
    password: "",
    profileUrl: "",
  });
  console.log(signUpField);

  function handleSignUpFiled(e) {
    const { name, value } = e.target;
    // console.log(name,value);

    setSignupField((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // signup this funcation post the data base
  async function handleSignUp() {
    axios
      .post(`http://localhost:8080/signup`, signUpField)
      .then((respose) => {
        // console.log("res", respose);
        toast.success(respose?.data?.message);
        setSignupField({
          channelName: "",
          userName: "",
          password: "",
          profileUrl: "",
        });
       navigate('/'); //after signup navigate home page
      })
      .catch((err) => {

        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Signup failed!");
        }
        console.log(err, "error");
      });
  }

  return (
    <>
      <Navbar />
      <div className=" bg-black text-white mt-[56px] flex flex-col items-center h-[92vh]  font-normal ">
        <div className=" w-[45%] mt-5 p-6  rounded-xl  border  shadow-[1px_0px_10px_white]    ">
          <div className=" text-[red] flex items-center  w-full justify-center  gap-2">
            <span className="text-4xl">
              {" "}
              <IoLogoYoutube />
            </span>
            <span className="text-white font-bold text-2xl">SignUp</span>
          </div>
          {/* upload from and video */}

          <div className=" flex gap-4 mt-[30px] items-center flex-col">
            <input
              onChange={(e) => handleSignUpFiled(e)}
              name="channelName"
              value={signUpField.channelName}
              className="w-[75%] h-11 px-5 text-white bg-[#3f3f3f] focus:outline-none border-none rounded-sm"
              type="email"
              placeholder="Channel Name"
            />
            <input
              onChange={(e) => handleSignUpFiled(e)}
              className="w-[75%] h-11 px-5 text-white bg-[#3f3f3f] focus:outline-none border-none rounded-sm"
              type="text"
              placeholder="User Name"
              name="userName"
              value={signUpField.userName}
            />
            <input
              onChange={(e) => handleSignUpFiled(e)}
              className="w-[75%] h-11 px-5 text-white bg-[#3f3f3f] focus:outline-none border-none rounded-sm"
              type="text"
              placeholder="Password"
              name="password"
              value={signUpField.password}
            />
           
            <div className=" flex  items-center gap-4   ">
              <input
                type="text"
                name="profileUrl"
                placeholder="Profile Image"
                onChange={(e) => handleSignUpFiled(e)}
                value={signUpField.profileUrl}
                className=" bg-[#3f3f3f] text-white
               p-3 rounded w-[70%] focus:outline-none"
              />
              <div className=" h-22 w-22">
                <img
                  className="  w-full h-full rounded-full"
                  // jb image ka url ka link input field se fill karen usi time img sho karega withou signup
                  src={
                    signUpField.profileUrl
                      ? signUpField.profileUrl
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png" //static profile
                  }
                 
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className=" flex justify-center items-center gap-3 mt-5">
            <div className=" px-5 outline-1 py-2 rounded  hover:bg-white hover:text-black cursor-pointer">
              <button onClick={handleSignUp}>SignUp</button>
            </div>
            <Link
              to={"/"}
              className=" px-5 outline-1 py-2 rounded  hover:bg-white hover:text-black cursor-pointer"
            >
              <button>Home Page</button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
