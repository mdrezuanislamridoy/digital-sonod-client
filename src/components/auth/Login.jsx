import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authUser from "../../state/userState";
import Loading from "../design/Loading";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let { login, message, error } = authUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error || message) {
        authUser.getState().resetMessage();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-96 gap-3 py-12 px-4 text-white  bg-gradient-to-br from-orange-400 to-orange-700 rounded-2xl shadow-orange-200 shadow-2xl"
      >
        <h2 className="text-4xl text-center font-medium mb-4 border-b-2 pb-3">
          Login Here
        </h2>
        {error && <p className="text-center text-blue-200">{error}</p>}
        {message && <p>{message}</p>}
        <label htmlFor="email">Enter Your Email Here</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
          placeholder="example@gmail.com"
          className="outline-none border-2 border-cyan-200 rounded-full py-1 px-2"
        />
        <label htmlFor="password">Enter Your Password Here</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password@#$123"
          onChange={handleChange}
          value={formData.password}
          className="outline-none border-2 border-cyan-200 rounded-full py-1 px-2 "
        />
        <button
          type="submit"
          className="py-2 outline-white outline-4 rounded-full hover:outline-none hover:bg-white hover:text-black transition my-4"
        >
          Login
        </button>
        <p className="text-emerald-300 text-center">
          <Link to={"/forgetPass"} className="py-1 border-b-2 ">
            Forgotten Password{" "}
          </Link>
        </p>
        <p className="text-center">
          Don't have an account{" "}
          <Link className="text-cyan-400 font-medium" to={"/signup"}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
