import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ViewProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-500">
      <div className="card bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <div className="card-body flex flex-col items-center text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="User Profile" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-4">{user?.displayName}</h1>
          <p className="text-gray-600">{user?.email}</p>
          <a className="btn btn-primary mt-4" href="/setting">
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
