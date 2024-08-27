import React, { useEffect, useState } from 'react';
import useFetch from '../../utils/Api';

const Dashboard = () => {
  const { data: userData, isPending: userPending, error: userError } = useFetch('http://localhost:5000/user');
  const { data: dbData, isPending: dbPending, error: dbError } = useFetch('http://localhost:8000/db');
  
  const [numCategories, setNumCategories] = useState(0);
  const [numUsers, setNumUsers] = useState(0);
  const [numItems, setNumItems] = useState(0);


  useEffect(() => {
    if (dbData) {
      setNumCategories(5);
      setNumItems(dbData.length);
    }
  }, [dbData]);

  useEffect(() => {
    if (userData) {
      setNumUsers(userData.length);
    }
  }, [userData]);

  if (userPending || dbPending) return <div>Loading...</div>;
  if (userError || dbError) return <div>Error: {userError || dbError}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Number of Categories</h2>
          <p className="text-3xl font-bold text-gray-800">{numCategories}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Number of Users</h2>
          <p className="text-3xl font-bold text-gray-800">{numUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Number of Items</h2>
          <p className="text-3xl font-bold text-gray-800">{numItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
