import React, { useState } from "react";

import { useForm } from "react-hook-form";
import authUser from "../../../state/userState";
import sonodStore from "../../../state/sonodStore";

export default function NagorikSonod() {
  const { user } = authUser();
  const { applySonod } = sonodStore();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  // Autofill if data available
  React.useEffect(() => {
    if (user) {
      setValue("fullName", user.name || "");
      setValue("email", user.email || "");
      setValue("phoneNumber", user.phone || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (!photo) {
      alert("Please upload your photo");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("email", data.email);
    formData.append("type", "nagorik-sonod");

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
      alert(res.message);
    } catch (error) {
      alert("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">নাগরিক সনদ আবেদন</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Personal Info */}
        <input
          {...register("fullName")}
          placeholder="পুরো নাম"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("fatherName")}
          placeholder="পিতার নাম"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("motherName")}
          placeholder="মাতার নাম"
          className="w-full border p-2 rounded"
        />

        <select {...register("gender")} className="w-full border p-2 rounded">
          <option value="">লিঙ্গ</option>
          <option value="male">পুরুষ</option>
          <option value="female">নারী</option>
        </select>

        <input
          type="date"
          {...register("dateOfBirth")}
          className="w-full border p-2 rounded"
        />
        <input
          {...register("nidNumber")}
          placeholder="এনআইডি নম্বর"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("phoneNumber")}
          placeholder="ফোন নাম্বার"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("email")}
          placeholder="ইমেইল"
          className="w-full border p-2 rounded"
        />

        {/* Photo Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        {/* Present Address */}
        <h3 className="font-semibold">বর্তমান ঠিকানা</h3>
        <input
          {...register("presentDivision")}
          placeholder="বিভাগ"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("presentDistrict")}
          placeholder="জেলা"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("presentUpazila")}
          placeholder="উপজেলা"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("presentUnion")}
          placeholder="ইউনিয়ন"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("presentVillage")}
          placeholder="গ্রাম"
          className="w-full border p-2 rounded"
        />

        {/* Permanent Address */}
        <h3 className="font-semibold">স্থায়ী ঠিকানা</h3>
        <input
          {...register("permanentDivision")}
          placeholder="বিভাগ"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("permanentDistrict")}
          placeholder="জেলা"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("permanentUpazila")}
          placeholder="উপজেলা"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("permanentUnion")}
          placeholder="ইউনিয়ন"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("permanentVillage")}
          placeholder="গ্রাম"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "অপেক্ষা করুন..." : "আবেদন করুন"}
        </button>
      </form>
    </div>
  );
}
