import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authUser from "../../../state/userState";
import sonodStore from "../../../state/sonodStore";
import { useNavigate } from "react-router-dom";

export default function NagorikSonod() {
  const { user } = authUser();
  const { applySonod } = sonodStore();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch } = useForm();

  const presentData = watch([
    "presentDivision",
    "presentDistrict",
    "presentUpazila",
    "presentUnion",
    "presentVillage",
    "presentHolding",
    "presentPostOffice",
    "presentWard",
  ]);

  // Auto fill personal info from user
  useEffect(() => {
    if (user) {
      setValue("fullName", user.name || "");
      setValue("email", user.email || "");
      setValue("phoneNumber", user.phone || "");
    }
  }, [user, setValue]);

  // Auto fill permanent address if sameAddress checked
  useEffect(() => {
    if (sameAddress) {
      setValue("permanentDivision", presentData[0]);
      setValue("permanentDistrict", presentData[1]);
      setValue("permanentUpazila", presentData[2]);
      setValue("permanentUnion", presentData[3]);
      setValue("permanentVillage", presentData[4]);
      setValue("permanentHolding", presentData[5]);
      setValue("permanentPostOffice", presentData[6]);
      setValue("permanentWard", presentData[7]);
    }
  }, [sameAddress, presentData, setValue]);

  const onSubmit = async (data) => {
    if (!photo) {
      alert("Please upload your photo");
      return;
    }

    const formData = new FormData();
    formData.append("sonodimage", photo);
    formData.append("email", data.email);
    formData.append("type", "nagorik-sonod");

    // Append objects as JSON strings
    formData.append(
      "personalInfo",
      JSON.stringify({
        fullName: data.fullName,
        fatherName: data.fatherName,
        motherName: data.motherName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        nidNumber: data.nidNumber,
        phoneNumber: data.phoneNumber,
        email: data.email,
      })
    );

    formData.append(
      "presentAddress",
      JSON.stringify({
        division: data.presentDivision,
        district: data.presentDistrict,
        upazila: data.presentUpazila,
        union: data.presentUnion,
        village: data.presentVillage,
        holdingNumber: data.presentHolding,
        postOffice: data.presentPostOffice,
        wardNo: data.presentWard,
      })
    );

    formData.append(
      "permanentAddress",
      JSON.stringify({
        division: data.permanentDivision,
        district: data.permanentDistrict,
        upazila: data.permanentUpazila,
        union: data.permanentUnion,
        village: data.permanentVillage,
        holdingNumber: data.permanentHolding,
        postOffice: data.permanentPostOffice,
        wardNo: data.permanentWard,
      })
    );

    try {
      setLoading(true);
      const res = await applySonod(formData);
      navigate("/chose-sonod");
    } catch (error) {
      alert("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        নাগরিক সনদ আবেদন
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Personal Info & Photo */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">ব্যক্তিগত তথ্য</h3>
            <input
              {...register("fullName")}
              placeholder="পুরো নাম"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("fatherName")}
              placeholder="পিতার নাম"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("motherName")}
              placeholder="মাতার নাম"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              {...register("gender")}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">লিঙ্গ</option>
              <option value="male">পুরুষ</option>
              <option value="female">নারী</option>
            </select>

            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("nidNumber")}
              placeholder="এনআইডি নম্বর"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("phoneNumber")}
              placeholder="ফোন নাম্বার"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("email")}
              placeholder="ইমেইল"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Photo Upload */}
            <div>
              <label className="block mb-1 font-medium">ছবি আপলোড</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Right Column: Addresses */}
          <div className="space-y-4">
            {/* Present Address */}
            <h3 className="font-semibold text-lg">বর্তমান ঠিকানা</h3>
            <input
              {...register("presentDivision")}
              placeholder="বিভাগ"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentDistrict")}
              placeholder="জেলা"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentUpazila")}
              placeholder="উপজেলা"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentUnion")}
              placeholder="ইউনিয়ন / পৌরসভা"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentVillage")}
              placeholder="গ্রাম"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentHolding")}
              placeholder="হোল্ডিং নং"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentPostOffice")}
              placeholder="ডাকঘর"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              {...register("presentWard")}
              placeholder="ওয়ার্ড নং"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Checkbox for same address */}
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={(e) => setSameAddress(e.target.checked)}
                className="w-4 h-4"
              />
              Present Address এবং Permanent Address একই
            </label>

            {/* Permanent Address */}
            <h3 className="font-semibold text-lg mt-2">স্থায়ী ঠিকানা</h3>
            <input
              {...register("permanentDivision")}
              placeholder="বিভাগ"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentDistrict")}
              placeholder="জেলা"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentUpazila")}
              placeholder="উপজেলা"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentUnion")}
              placeholder="ইউনিয়ন / পৌরসভা"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentVillage")}
              placeholder="গ্রাম"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentHolding")}
              placeholder="হোল্ডিং নং"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentPostOffice")}
              placeholder="ডাকঘর"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
            <input
              {...register("permanentWard")}
              placeholder="ওয়ার্ড নং"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={sameAddress}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold"
        >
          {loading ? "অপেক্ষা করুন..." : "আবেদন করুন"}
        </button>
      </form>
    </div>
  );
}
