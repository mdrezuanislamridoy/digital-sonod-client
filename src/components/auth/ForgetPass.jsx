import React, { useEffect, useState } from "react";
import authUser from "../../state/userState";
import { Link } from "react-router-dom";

export default function ForgetPass() {
  const { user, forgetPasswordCode, forgetPassword } = authUser();

  const [email, setEmail] = useState(user?.email || "");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [disabledSend, setDisabledSend] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    setError("");
    setMessage("");
  }, [email, code, newPassword]);

  const handleSendCode = async () => {
    if (!email) return setError("Email is required");
    setLoadingBtn(true);

    const result = await forgetPasswordCode(email);
    if (result.success) {
      setCodeSent(true);
      setDisabledSend(true);
      setMessage("Verification code sent to your email.");
      setLoadingBtn(false);
    } else {
      setError("Failed to send code");
      setLoadingBtn(false);
    }
  };

  const handleResetPassword = async () => {
    if (!code || !newPassword) return setError("All fields are required");

    const result = await forgetPassword(email, code, newPassword);
    if (result.success) {
      setMessage("Password changed successfully!");
      setIsChanged(true);
    } else {
      setError("Invalid code or something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col w-96 gap-3 py-12 px-4 text-white bg-gradient-to-br from-orange-400 to-orange-700 rounded-2xl shadow-orange-200 shadow-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-3xl text-center font-bold mb-4 border-b pb-3">
          Forgot Password
        </h2>

        {error && <p className="text-red-200 text-center">{error}</p>}
        {message && <p className="text-green-200 text-center">{message}</p>}

        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          disabled={!!user}
          onChange={(e) => {
            setEmail(e.target.value);
            setDisabledSend(false);
            setCodeSent(false);
          }}
          className="rounded-full px-3 py-1 outline-none border-2 border-white text-white"
          placeholder="example@gmail.com"
        />

        {!codeSent && (
          <button
            disabled={disabledSend}
            onClick={handleSendCode}
            className={`py-2 px-4 rounded-full ${
              disabledSend
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
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
        )}

        {codeSent && (
          <>
            <label htmlFor="code">Enter Verification Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded-full px-3 py-1 outline-none border-2 border-white text-white"
              placeholder="123456"
            />

            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-full px-3 py-1 outline-none border-2 border-white text-white"
              placeholder="NewSecure@123"
            />

            <button
              onClick={handleResetPassword}
              className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded-full"
            >
              Change Password
            </button>
          </>
        )}

        {isChanged && (
          <p className="text-center mt-3">
            <Link to="/" className="text-cyan-300 underline">
              Go to Home/Login Page
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
