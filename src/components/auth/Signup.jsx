import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authUser from "../../state/userState";
import Loading from "../design/Loading";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verificationCode: "",
    role: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  let { sendCode, createUser, message, error } = authUser();

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
    createUser(formData);
  };

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setLoadingBtn(true);
    const result = await sendCode(formData.email);
    if (!result.success) {
      setLoadingBtn(false);
      return setIsVerifying(false);
    }
    setLoadingBtn(false);

    return setIsVerifying(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-96 gap-3 py-12 px-4 text-white  bg-gradient-to-br from-orange-400 to-orange-700 rounded-2xl shadow-orange-200 shadow-2xl"
      >
        <h2 className="text-4xl text-center font-medium mb-4 border-b-2 pb-3">
          Sign Up Here
        </h2>
        {error && <p className="text-center text-blue-200">{error}</p>}
        {message && <p className="text-center text-blue-200">{message}</p>}
        <label htmlFor="name">Enter Your Name Here</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleChange}
          value={formData.name}
          placeholder="Harry Potter..."
          className="outline-none border-2 border-cyan-200 rounded-full py-1 px-2"
        />

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
        {!isVerifying ? (
          <button
            onClick={sendVerificationCode}
            className="bg-blue-400 py-2 rounded-full "
          >
            {!loadingBtn ? (
              "Send Code"
            ) : (
              <span className="flex justify-center">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-white-500 fill-blue-900"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
            )}
          </button>
        ) : (
          <input
            type="text"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            placeholder="Your Verification Code"
            className="outline-none border-2 border-cyan-200 rounded-full py-1 px-2"
          />
        )}
        <label htmlFor="password">Enter Your Password Here</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password@#$123"
          onChange={handleChange}
          value={formData.password}
          className="outline-none border-2 border-cyan-200 rounded-full py-1 px-2 "
          required
        />
        <label htmlFor="role">Select Your Role</label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="text-slate-600 bg-white py-2 px-4 outline-none border border-amber-300 rounded-full"
          required
        >
          <option value="">Select role</option>
          <option value="user">User</option>
          <option value="chairman">Chairman</option>
        </select>

        <button
          type="submit"
          disabled={formData.verificationCode ? false : true}
          className="py-2 outline-white outline-4 rounded-full hover:outline-none hover:bg-white hover:text-black transition my-4"
        >
          Signup
        </button>
        <p className="text-emerald-300 text-center">
          <Link to={"/forgetPass"} className="py-1 border-b-2 ">
            Forgotten Password{" "}
          </Link>
        </p>
        <p className="text-center">
          Don't have an account{" "}
          <Link className="text-cyan-400 font-medium" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
