import React from 'react';
import { ImProfile } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("user"));

    const handleLogOut = () => {
        localStorage.removeItem("currentuser");
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold mb-2">Profile</h1>
                    <ImProfile className="text-4xl mx-auto text-blue-600" />
                    <h2 className="text-xl font-semibold mt-2">{userData.username}</h2>
                </div>
                <div className="mb-6">
                    <label htmlFor="#">Username: </label>
                    <h2 className="text-lg font-medium">{userData.username}</h2>
                    <label htmlFor="#">Email: </label>
                    <h2 className="text-lg font-medium">{userData.email}</h2>
                </div>
                <div className="flex justify-between">
                    <Link to='/'>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Go To Shop
                        </button>
                    </Link>
                    <button onClick={handleLogOut} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
