import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../Data/Categories";
import { CategoryContext, UserContext } from "./UserContext";

export const Login = () => {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const { category, setCategory } = useContext(CategoryContext);
  const { context, setContext } = useContext(UserContext);
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const Login = (details) => {
    console.log(details);
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
      setContext(details.name);
    } else {
      console.log("Details do not match!");
      setError("Details do not match!");
    }
  };

  const Logout = () => {
    console.log("logout");
    setUser({ name: "", email: "" });
    setContext(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <div className="flex justify-center items-center h-screen text-center text-white">
      {context !== null ? (
        <div className="welcome text-purple-800 ">
          <h2 className="text-3xl">
            Welcome, <span>{user.name}</span>
          </h2>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl">
              Please select your preferred programming language:
            </h3>
            <div className="my-3 w-96">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                className="form-select appearance-none
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                {Categories.map((category) => {
                  return (
                    <option key={category.value} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <Link to="/questions">
              <button
                className={`p-4 bg-purple-700 text-white font-semibold rounded shadow mr-5`}
              >
                Start Quiz
              </button>
            </Link>
            <button
              onClick={Logout}
              className={`p-4 bg-purple-700 text-white font-semibold rounded shadow ml-5`}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="form-inner">
            <h2>Please Login</h2>
            {error !== "" ? <div className="erorr">{error}</div> : ""}
            <div className="form-group mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                id="name"
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                value={details.name}
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />
            </div>
          </div>
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="LOGIN"
          />
        </form>
      )}
    </div>
  );
};
