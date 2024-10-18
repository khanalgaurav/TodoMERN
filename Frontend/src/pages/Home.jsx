import React from "react";
import axios from "axios";
import { useGlobalContext } from "../contex";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {
  const { loggedIn, setLoggedIn, loading, setLoading } = useGlobalContext();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:8000/logout", {
        withCredentials: true, // Ensure cookies are sent along with the request
      });
      alert(response.data.message);
      setLoggedIn(false);
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return loggedIn ? (
      <div className="h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-black text-white py-1 px-3 rounded-md mt-2"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  }
};

export default Home;
