import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout().then(() => {
        dispatch(logout());
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <button
        className="inline-block px-5 py-2 rounded-full  hover:cursor-pointer hover:bg-cyan-400 text-white hover:text-gray-800 hover:font-bold transition duration-200 shadow-lg"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;
