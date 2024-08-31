import React, { useEffect, useState } from 'react';
import useFetch from '../../utils/Api';

const Dashboard = () => {
  // Fetch existing data
  const { data: userData, isPending: userPending, error: userError } = useFetch('http://localhost:5000/admin/users');
  const { data: dbData, isPending: dbPending, error: dbError } = useFetch('http://localhost:5000/admin/products');
  
  // Fetch new metrics
  const { data: revenueData, isPending: revenuePending, error: revenueError } = useFetch('http://localhost:5000/admin/revenue');
  const { data: purchasedData, isPending: purchasedPending, error: purchasedError } = useFetch('http://localhost:5000/admin/purchase');
  
  const [numCategories, setNumCategories] = useState(0);
  const [numUsers, setNumUsers] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPurchased, setTotalPurchased] = useState(0);

  useEffect(() => {
    if (dbData) {
      setNumCategories(5); // Assuming you have a fixed number of categories
      setNumItems(dbData.length);
    }
  }, [dbData]);

  useEffect(() => {
    if (userData) {
      setNumUsers(userData.length);
    }
  }, [userData]);

  useEffect(() => {
    if (revenueData) {
      setTotalRevenue(revenueData.totalRevenue);
    }
  }, [revenueData]);

  useEffect(() => {
    if (purchasedData) {
      setTotalPurchased(purchasedData.totalQuantity);
    }
  }, [purchasedData]);

  if (userPending || dbPending || revenuePending || purchasedPending) return <div>Loading...</div>;
  if (userError || dbError || revenueError || purchasedError) return <div>Error: {userError || dbError || revenueError || purchasedError}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Total Revenue</h2>
          <p className="text-3xl font-bold text-gray-800">₹ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Total Purchased Products</h2>
          <p className="text-3xl font-bold text-gray-800">{totalPurchased}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
