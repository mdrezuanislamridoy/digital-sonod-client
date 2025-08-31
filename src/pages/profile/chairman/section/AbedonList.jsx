import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // if you're using react-router
import sonodStore from "../../../../state/sonodStore";

export default function AbedonList() {
  const { allSonod, getAllSonods, updateSonodStatus } = sonodStore();
  const [selectedSonod, setSelectedSonod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllSonods();
  }, []);

  const handleApprove = async (id) => {
    await updateSonodStatus(id, "approved");
    navigate(`/choose-sonod/${id}/pdf`); // redirect to PDF page
  };

  const handleReject = async (id) => {
    await updateSonodStatus(id, "rejected");
    setSelectedSonod(null);
  };

  if (!allSonod || allSonod.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-center mt-8">
        No Sonod Found
      </h2>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Sonod Applications</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSonod.map((sonod) => (
          <div
            key={sonod._id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedSonod(sonod)}
          >
            <div className="flex items-center gap-4">
              <img
                src={sonod.photo}
                alt="User"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold">{sonod.personalInfo.fullName}</h3>
                <p className="text-sm text-gray-600">{sonod.type}</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                sonod.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : sonod.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {sonod.status}
            </span>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {selectedSonod && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedSonod(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              {selectedSonod.personalInfo.fullName} - Sonod Details
            </h2>

            <div className="space-y-2">
              <img
                src={selectedSonod.photo}
                alt="Photo"
                className="w-24 h-24 rounded border object-cover mb-3"
              />
              <p>
                <b>Type:</b> {selectedSonod.type}
              </p>
              <p>
                <b>Father:</b> {selectedSonod.personalInfo.fatherName}
              </p>
              <p>
                <b>Mother:</b> {selectedSonod.personalInfo.motherName}
              </p>
              <p>
                <b>Status:</b> {selectedSonod.status}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleApprove(selectedSonod._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve & Go to PDF
              </button>
              <button
                onClick={() => handleReject(selectedSonod._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
