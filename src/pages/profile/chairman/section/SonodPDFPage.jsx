import { useParams } from "react-router-dom";
import sonodStore from "../../../../state/sonodStore";
import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

export default function SonodPDFPage() {
  const { id } = useParams();
  const { getSonodById } = sonodStore();
  const [sonod, setSonod] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    async function fetchSonod() {
      const data = await getSonodById(id);
      setSonod(data);
    }
    fetchSonod();
  }, [id, getSonodById]);

  const handleSave = () => {
    const element = printRef.current;
    html2pdf()
      .set({
        margin: 0,
        filename: "sonod.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  if (!sonod) return <h2 className="text-center mt-6">Loading Sonod...</h2>;

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* Full A4 size fixed container */}
      <div
        ref={printRef}
        style={{
          width: "794px",
          height: "1123px",
          transform: "scale(0.9)", // shrink content (0.8 = 80%, 0.9 = 90%)
          transformOrigin: "top left", // scale from top left
          backgroundColor: "#fff",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            borderBottom: "4px solid #000",
            paddingBottom: "10px",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
            গণপ্রজাতন্ত্রী বাংলাদেশ
          </h1>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "5px" }}>
            Union Parishad Sonod
          </h2>
          <p style={{ fontSize: "14px", color: "#444" }}>Issued by Chairman</p>
        </div>

        {/* Info Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            marginTop: "30px",
            gap: "20px",
          }}
        >
          <div style={{ fontSize: "16px", lineHeight: "24px" }}>
            <p>
              <b>Name:</b> {sonod.personalInfo.fullName}
            </p>
            <p>
              <b>Father’s Name:</b> {sonod.personalInfo.fatherName}
            </p>
            <p>
              <b>Mother’s Name:</b> {sonod.personalInfo.motherName}
            </p>
            <p>
              <b>Date of Birth:</b>{" "}
              {sonod.personalInfo.dateOfBirth?.slice(0, 10)}
            </p>
            <p>
              <b>NID:</b> {sonod.personalInfo.nidNumber || "N/A"}
            </p>
            <p>
              <b>Sonod Type:</b> {sonod.type}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src={sonod.photo}
              alt="User"
              style={{
                width: "100px",
                height: "100px",
                border: "2px solid #555",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Address */}
        <div
          style={{ marginTop: "30px", fontSize: "15px", lineHeight: "22px" }}
        >
          <h3
            style={{
              fontWeight: "600",
              textDecoration: "underline",
              marginBottom: "8px",
            }}
          >
            Address
          </h3>
          <p>
            <b>Present:</b> {sonod.presentAddress?.village},{" "}
            {sonod.presentAddress?.union}, {sonod.presentAddress?.upazila},{" "}
            {sonod.presentAddress?.district}
          </p>
          <p>
            <b>Permanent:</b> {sonod.permanentAddress?.village},{" "}
            {sonod.permanentAddress?.union}, {sonod.permanentAddress?.upazila},{" "}
            {sonod.permanentAddress?.district}
          </p>
        </div>

        {/* Body */}
        <div
          style={{
            marginTop: "40px",
            fontSize: "15px",
            lineHeight: "26px",
            textAlign: "justify",
          }}
        >
          <p>
            This is to certify that <b>{sonod.personalInfo.fullName}</b>,
            son/daughter of <b>{sonod.personalInfo.fatherName}</b> and{" "}
            <b>{sonod.personalInfo.motherName}</b>, is a permanent resident of{" "}
            {sonod.permanentAddress?.village}, {sonod.permanentAddress?.union},{" "}
            {sonod.permanentAddress?.upazila},{" "}
            {sonod.permanentAddress?.district}. According to our records, the
            provided information is correct and this Sonod is issued for
            official purposes.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "40px",
            right: "40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: "13px", color: "#555" }}>Issued On:</p>
            <p style={{ fontWeight: "600" }}>
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "60px" }}>_____________________</p>
            <p style={{ fontWeight: "600" }}>Chairman</p>
            <p style={{ fontSize: "13px", color: "#555" }}>Union Parishad</p>
          </div>
        </div>
      </div>

      {/* Only button outside PDF */}
      <button
        onClick={handleSave}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-2 shadow-md"
      >
        Save PDF
      </button>
    </div>
  );
}
