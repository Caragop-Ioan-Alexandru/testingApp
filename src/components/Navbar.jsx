import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export const Navbar = () => {
  const { context } = useContext(UserContext);

  return (
    <div className="flex justify-between bg-purple-300 py-3 fixed w-screen">
      <Link to="/" className="text-3xl text-purple-800 font-bold ml-5">
        LOGO
      </Link>
      <pre className="text-purple-800 text-xl mr-5">{context}</pre>
    </div>
  );
};
