import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faGavel,
  faScroll,
  faSkull,
  faIdCard,
  faGlobe,
  faRing,
  faShieldAlt,
  faMoneyBillWave,
  faWheelchair,
  faFingerprint,
  faBaby,
  faSms,
  faHandHoldingHeart,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  { title: "পারিবারিক সনদ", icon: faUsers },
  { title: "উত্তরাধিকার সনদ", icon: faGavel },
  { title: "ওয়ারিশ সনদ", icon: faScroll },
  { title: "মৃত্যু সনদ", icon: faSkull },
  { title: "জাতীয়তা সনদ", icon: faIdCard },
  { title: "নাগরিকত্ব সনদ", icon: faGlobe },
  { title: "বিবাহিত/অবিবাহিত সনদ", icon: faRing },
  { title: "চারিত্রিক সনদ", icon: faShieldAlt },
  { title: "আর্থিক অস্বচ্ছলতার সনদ", icon: faMoneyBillWave },
  { title: "প্রতিবন্ধী সনদ", icon: faWheelchair },
  { title: "এনআইডি যাচাইকরণ", icon: faFingerprint },
  { title: "জন্ম নিবন্ধন", icon: faBaby },
  { title: "এসএমএস সার্ভিস", icon: faSms },
  { title: "ভিজিএফ সেবা", icon: faHandHoldingHeart },
  { title: "অনলাইন আবেদন", icon: faLaptopCode },
];

export default function SebasomuhoSection() {
  return (
    <section className="bg-orange-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-orange-800">
          আমাদের সেবাসমূহ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition text-center"
            >
              <FontAwesomeIcon
                icon={service.icon}
                className="text-orange-500 text-3xl mb-3"
              />
              <p className="text-sm font-semibold text-gray-700">
                {service.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
