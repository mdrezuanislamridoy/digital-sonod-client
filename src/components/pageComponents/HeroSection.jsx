import React from "react";
import { useNavigate } from "react-router-dom";
import sonodImg from "../../assets/images/example-sonod.jpg";
import highCourt from "../../assets/images/high-court.jpg";

export default function HeroSection({ user }) {
  const navigate = useNavigate();

  const handleApply = () => {
    if (user) {
      navigate("/choose-sonod");
    } else {
      navigate("/login");
    }
  };

  const handleMySonods = () => {
    navigate("/my-sonods");
  };

  return (
    <section
      className=" relative text-white py-20 px-4 sm:px-10 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${highCourt}')` }}
    >
      <div className="absolute inset-0 bg-black/40 bg-opacity-70 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-6">
            যেকোনো ধরনের সনদের জন্য <br className="hidden sm:block" /> এখুনি
            আবেদন করুন
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleApply}
              className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition"
            >
              Apply Now
            </button>
            <button
              onClick={handleMySonods}
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-900 transition"
            >
              Get My Sonods
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={sonodImg}
            alt="Example Sonod"
            className="w-80 md:w-96 rounded-2xl shadow-2xl border-4 border-white"
          />
        </div>
      </div>
    </section>
  );
}
