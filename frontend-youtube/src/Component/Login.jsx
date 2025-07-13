  import axios from "axios";
  import { useState } from "react";
  import { IoLogoYoutube } from "react-icons/io5";
  import { Link, useNavigate } from "react-router-dom";
  import { toast ,ToastContainer } from "react-toastify";

  function Login({ closeLoginModel }) {
  const navigate=  useNavigate()
    // from handling
    const [loginField, setLoginField] = useState({ userName: "", password: "" });
    // console.log("loginfield", loginField);
    // input handle function 
    function handleOnchnageInput(e) {
    
      const { name, value } = e.target;
      setLoginField((prev) => ({
        ...prev,
        [name]: value,
      }));
    }



    async function handleLogin(){
      axios.post(`http://localhost:8080/login`,loginField).then((response)=>{
        console.log("login",response);
        
        navigate('/')
        localStorage.setItem("token",response?.data?.token);
        localStorage.setItem("userId", JSON.stringify(response?.data.user?._id))
        localStorage.setItem("profile", JSON.stringify(response?.data.user?.profileUrl))
          setLoginField({
          
            userName: "",
            password: "",
            
          });
          toast.success(response?.data?.message);
          closeLoginModel();
      }).catch((err) => {
      
              if (err.response && err.response.data.message) {
                toast.error(err.response.data.message);
              } else {
                toast.error("Invailed Password");
              }
              console.log(err, "error");
            });
    }
    return (
      <>
        <div className="w-full h-full fixed top-0 text-white flex justify-center z-50  bg-[#00000079]">
          <div
            className="md:w-[40%] login_form  h-[60%] bg-[black] p-[60px
          ] mt-[80px] flex flex-col items-center rounded-xl shadow-[1px_0px_10px_white] z-50 relative"
          >
            <div className=" text-[red] flex mt-11 items-center  w-full justify-center  gap-2">
              <span className="text-4xl">
            
                <IoLogoYoutube />
              </span>
              <span className="text-white font-bold text-2xl">Login</span>
            </div>

            <div className=" flex flex-col gap-7 mt-6 w-full items-center justify-center">
              <div className="w-full flex justify-center items-center">
                <input
                  onChange={(e) => handleOnchnageInput(e)}
                  value={loginField.userName}
                  type="text"
                  name="userName"
                  placeholder="UserName"
                  className="login-input md:w-[60%] text-white px-2.5 rounded-sm bg-[#222222]   outline-none py-2"
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <input
                  onChange={(e) => handleOnchnageInput(e)}
                  value={loginField.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="login-input w-[60%] text-white px-2.5 rounded-sm bg-[#222222]   outline-none py-2"
                />
              </div>
            </div>


            <div className="flex gap-9 flex-wrap mt-6 px-4">
              <div className="py-2 px-4 rounded hover:bg-white hover:text-black hover:text-bold  border ">
                <button onClick={handleLogin} className="font-bold cursor-pointer">Login</button>
              </div>
              <Link
                to={"/signup"}
                className="py-2 px-4 rounded hover:bg-white hover:text-black hover:text-bold  border "
              >
                <button className="font-bold cursor-pointer">SignUp</button>
              </Link>
              <div className="py-2 px-4 rounded hover:bg-white hover:text-black hover:text-bold  border ">
                <button onClick={() => closeLoginModel()} className="font-bold cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>



          </div>
        </div>
        <ToastContainer/>
      </>
    );
  }

  export default Login;
