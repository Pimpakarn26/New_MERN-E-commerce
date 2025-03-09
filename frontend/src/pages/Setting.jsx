import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Setting = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(displayName, photoURL);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-500">
      <div className="card bg-white p-8 rounded-xl shadow-xl border w-full max-w-md">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Settings</h2>
          
          {/* Avatar Preview */}
          <div className="flex justify-center mt-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={photoURL || "https://via.placeholder.com/100"} alt="Profile Preview" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile picture URL</span>
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
