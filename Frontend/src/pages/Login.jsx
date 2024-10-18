import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contex";
import axios from "axios";
const Login = () => {
  const { userLogin, setUserLogin, setLoggedIn, loggedIn } = useGlobalContext();
  const navigate = useNavigate();
  const handleOnchange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/login",
        {
          email: userLogin.email,
          password: userLogin.password,
        },
        {
          withCredentials: true, // Important to allow cookies
        }
      );
      if (res.data.success) {
        navigate("/");
        setLoggedIn(true);
      } else {
        alert("invalid password");
        navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border border-black rounded-md w-80 p-3"
      >
        <h1 className="mb-5 text-xl font-bold">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleOnchange}
            className="border border-black focus:outline-none p-1 rounded-md"
            type="email"
            name="email"
            value={userLogin.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleOnchange}
            className="border border-black focus:outline-none p-1 rounded-md"
            type="password"
            name="password"
            value={userLogin.password}
          />
        </div>
        <p className="text-center my-2">
          Don't have an account ?{" "}
          <Link to="/signup">
            <span>Signup</span>
          </Link>
        </p>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-black text-white py-1 px-3 rounded-md mt-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
