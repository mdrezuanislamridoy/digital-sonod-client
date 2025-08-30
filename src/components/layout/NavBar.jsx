import React, { useState } from "react";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import authUser from "../../state/userState";

export default function NavBar({ user, logout }) {
  const [isHidden, setIsHidden] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "সেবা সমুহ", to: "/choose-sonod" },
    { name: "জরুরী যোগাযোগ", to: "/emergency-contact" },
    { name: "আমাদের সম্পর্কে", to: "/about" },
    { name: "আবেদনের নিয়ম", to: "/applying rules" },
  ];

  const handleNavClick = (to) => {
    navigate(to);
    setIsHidden(true);
    setShowProfile(false);
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      console.log("Logged Out Successfully");
    }
  };

  const NavLinkItem = ({ name, to }) => (
    <button
      onClick={() => handleNavClick(to)}
      className={`text-sm font-semibold mr-4 ${
        location.pathname === to
          ? "text-orange-600 underline"
          : "text-gray-800 hover:text-orange-600"
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="bg-gray-100 font-sans w-full m-0">
      <div className="bg-orange-50 shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-2xl font-medium cursor-pointer">
              <Link to={"/"}>
                <img className="w-12" src={logo} alt="Digital Sonod" />
              </Link>
            </h2>

            <div className="hidden sm:flex sm:items-center">
              {navLinks.map((link) => (
                <NavLinkItem key={link.to} name={link.name} to={link.to} />
              ))}
            </div>

            {!user ? (
              <div className="hidden sm:flex sm:items-center">
                <button
                  onClick={() => handleNavClick("/")}
                  className={`text-sm font-semibold mr-4 ${
                    location.pathname === "/"
                      ? "text-orange-600 underline"
                      : "text-gray-800 hover:text-orange-600"
                  }`}
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleNavClick("/signup")}
                  className={`text-sm font-semibold border px-4 py-2 rounded-lg ${
                    location.pathname === "/signup"
                      ? "text-orange-600 border-purple-600"
                      : "text-gray-800 hover:text-orange-600 hover:border-purple-600"
                  }`}
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div
                className="relative cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-xl text-gray-700"
                  />
                )}
                {showProfile && (
                  <div className="absolute w-60 right-0 text-center top-8 bg-orange-400 backdrop-blur-3xl py-4 px-2 text-white rounded-l-2xl rounded-br-2xl flex justify-center items-center flex-col z-50">
                    <div
                      onClick={() => handleNavClick("/profile")}
                      className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mb-5 flex justify-center items-center"
                    >
                      {user.profilePic ? (
                        <img
                          className="w-full"
                          src={user.profilePic}
                          alt={user.name}
                        />
                      ) : (
                        <FontAwesomeIcon className="text-6xl" icon={faUser} />
                      )}
                    </div>
                    <ul className="flex flex-col gap-3">
                      <li>
                        <button
                          onClick={() => handleNavClick("/profile")}
                          className="bg-amber-500 py-1 px-4"
                        >
                          {user.name}
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleNavClick("/contact")}>
                          Contact
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout &nbsp;
                          <FontAwesomeIcon icon={faSignOut} />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div
              className="sm:hidden cursor-pointer"
              onClick={() => setIsHidden(!isHidden)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-orange-600"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.95 17c-.23 1.14-1.24 2-2.45 2s-2.22-.86-2.45-2H3.5a.5.5 0 0 1 0-1h4.55c.23-1.14 1.24-2 2.45-2s2.22.86 2.45 2h7.55a.5.5 0 0 1 0 1h-7.55ZM18.95 12c-.23 1.14-1.24 2-2.45 2s-2.22-.86-2.45-2H3.5a.5.5 0 0 1 0-1h10.55c.23-1.14 1.24-2 2.45-2s2.22.86 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55ZM9.95 7C9.72 8.14 8.71 9 7.5 9S5.28 8.14 5.05 7H3.5a.5.5 0 0 1 0-1h1.55c.23-1.14 1.24-2 2.45-2s2.22.86 2.45 2h11.05a.5.5 0 0 1 0 1H9.95Z"
                />
              </svg>
            </div>
          </div>

          {!isHidden && (
            <div className="block sm:hidden bg-white border-t-2 py-2">
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <button
                    key={link.to}
                    onClick={() => handleNavClick(link.to)}
                    className={`text-sm font-semibold mb-1 ${
                      location.pathname === link.to
                        ? "text-orange-600 underline"
                        : "text-gray-800 hover:text-orange-600"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                {!user ? (
                  <div className="flex justify-between items-center border-t-2 pt-2">
                    <button
                      onClick={() => handleNavClick("/login")}
                      className="text-sm font-semibold mr-4 text-gray-800 hover:text-orange-600"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => handleNavClick("/signup")}
                      className="text-sm font-semibold border px-4 py-1 rounded-lg text-gray-800 hover:text-orange-600 hover:border-purple-600"
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={() => handleNavClick("/profile")}
                      className="w-full py-2 text-sm font-medium text-white bg-orange-500 rounded-lg mb-2"
                    >
                      {user.name}
                    </button>
                    <button
                      onClick={() => handleNavClick("/contact")}
                      className="text-sm font-semibold text-gray-800 hover:text-orange-600"
                    >
                      Contact
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
