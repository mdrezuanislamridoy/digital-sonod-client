import { useParams } from "react-router-dom";
import sonodStore from "../../../../state/sonodStore";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sonod?.personalInfo.fullName + "_Sonod",
  });

  if (!sonod) return <h2 className="text-center mt-6">Loading Sonod...</h2>;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Attach ref directly to plain div */}
      <div
        ref={printRef}
        className="w-[794px] h-[1123px] bg-white border-[6px] border-gray-800 shadow-lg relative px-10 py-8"
      >
        <div className="text-center border-b-4 border-gray-800 pb-4">
          <h1 className="text-3xl font-bold uppercase">
            গণপ্রজাতন্ত্রী বাংলাদেশ
          </h1>
          <h2 className="text-xl font-semibold mt-1">Union Parishad Sonod</h2>
          <p className="text-sm text-gray-600">Issued by Chairman</p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
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
          <div className="flex justify-end">
            <img
              src={sonod.photo}
              alt="User"
              className="w-28 h-28 object-cover border-2 border-gray-400 rounded"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold underline mb-2">Address</h3>
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

        <div className="mt-8 text-justify leading-relaxed text-[#4a4a4a]">
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

        <div className="absolute bottom-16 left-0 right-0 flex justify-between px-10">
          <div>
            <p className="text-sm text-gray-600">Issued On:</p>
            <p className="font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-center">
            <p className="mb-12">_____________________</p>
            <p className="font-semibold">Chairman</p>
            <p className="text-sm text-gray-600">Union Parishad</p>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-2 shadow-md"
      >
        Print / Save PDF
      </button>
    </div>
  );
}
