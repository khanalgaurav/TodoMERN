import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../contex";
const Signup = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      setUser({
        username: "",
        email: "",
        password: "",
      });
      alert(response.data.message);
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border border-black rounded-md w-80 p-3"
      >
        <h1 className="mb-5 text-xl font-bold">Sign up</h1>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            onChange={handleOnchange}
            className="border border-black focus:outline-none p-1 rounded-md"
            type="text"
            name="username"
            value={user.username}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleOnchange}
            className="border border-black focus:outline-none p-1 rounded-md"
            type="email"
            name="email"
            value={user.email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleOnchange}
            className="border border-black focus:outline-none p-1 rounded-md"
            type="password"
            name="password"
            value={user.password}
          />
        </div>
        <p className="text-center my-2">
          Already have an account ?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-black text-white py-1 px-3 rounded-md mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
