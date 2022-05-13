import React from "react";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div className="h-screen flex justify-center items-center text-center flex-col">
      <h1 className="text-3xl text-purple-800 font-bold">
        Hello Everyone!
        <br /> Please login first to start the test
      </h1>
      <Link
        to="/login"
        className="p-4 bg-purple-300 rounded text-purple-800 font-bold text-xl mt-5"
      >
        GO TO LOGIN
      </Link>
    </div>
  );
};
