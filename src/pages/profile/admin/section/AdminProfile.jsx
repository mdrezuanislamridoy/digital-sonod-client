import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faClose,
  faPen,
  faEnvelope,
  faCalendarAlt,
  faPhone,
  faMapMarkerAlt,
  faVenusMars,
  faUserTie,
  faSave,
  faGlobe,
  faIdCard,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import authUser from "../../../../state/userState";

export default function AdminProfile() {
  const { user, setFile, updateProfilePicture, updateProfile } = authUser();

  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    birthDate: user.birthDate || "",
    age: user.age || "",
    gender: user.gender || "",
    phone: user.phone || "",
    address: user.address || "",
    email: user.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(editData);
    setIsEditing(false);
  };

  const handleProfilePicChange = async (e) => {
    const photo = e.target.files[0];
    if (photo) {
      await setFile(photo);
      const res = await updateProfilePicture();
      const url = res.data.user?.profilePic || URL.createObjectURL(photo);
      setProfilePic(url);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 mt-30">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-white rounded-lg sm:rounded-xl shadow-md px-4 sm:px-6 md:px-8 py-4 sm:py-6 -mt-16 sm:-mt-20 z-10 border border-gray-100">
          <div className="flex flex-col xs:flex-row items-center gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative -mt-12 sm:-mt-16 md:-mt-24 rounded-full shadow-xl border-4 border-white overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                src={profilePic || ""}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
              <label className="absolute right-1 bottom-1 sm:right-2 sm:bottom-2 bg-white/90 hover:bg-gray-100 transition rounded-full p-1 sm:p-2 shadow cursor-pointer border border-gray-200">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-gray-700 text-xs sm:text-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>

            {/* Profile Info - Responsive text sizing */}
            <div className="flex-1 w-full min-w-0">
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 sm:gap-3">
                <div className="min-w-0">
                  <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-800 truncate">
                    {user.name}
                  </h2>
                  <span className="inline-block mt-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {user.role || "Administrator"}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm sm:text-base"
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-xs sm:text-sm"
                  />
                  <span>Edit Profile</span>
                </button>
              </div>

              <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base break-words">
                {user.bio || "No bio added yet"}
              </p>

              {/* Stats - Responsive layout */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-500"
                  />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-gray-500"
                    />
                    <span className="truncate">{user.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUserTie} />
              <span>Personal Information</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-sm sm:text-base">{user.name}</p>
              </div>

              {user.gender && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Gender</p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faVenusMars}
                      className="text-gray-500"
                    />
                    {user.gender}
                  </p>
                </div>
              )}

              {user.birthDate && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Date of Birth
                  </p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-gray-500"
                    />
                    {new Date(user.birthDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {user.age && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Age</p>
                  <p className="font-medium text-sm sm:text-base">
                    {user.age} years
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Contact Info Card */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Contact Information</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Email Address
                </p>
                <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-500"
                  />
                  <span className="break-all">{user.email}</span>
                </p>
              </div>

              {user.phone && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Phone Number
                  </p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                    {user.phone}
                  </p>
                </div>
              )}

              {user.address && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Physical Address
                  </p>
                  <p className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-gray-500"
                    />
                    {user.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-md sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-3 sm:p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg sm:text-xl">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FontAwesomeIcon icon={faClose} size="sm" />
              </button>
            </div>

            <form
              onSubmit={handleEditSubmit}
              className="p-4 sm:p-6 space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                    required
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={editData.birthDate}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={editData.age}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={editData.gender}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    className="text-xs sm:text-sm"
                  />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
