import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="three-body ">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
}
