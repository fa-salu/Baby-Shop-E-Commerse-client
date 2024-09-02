import React, { useEffect, useState } from "react";
import useFetch from "../../utils/Api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Spinner from "../../Component/Spinner/Spinner";

const Dashboard = () => {
  const {
    data: userData,
    isPending: userPending,
    error: userError,
  } = useFetch("http://localhost:5000/admin/users");
  const {
    data: dbData,
    isPending: dbPending,
    error: dbError,
  } = useFetch("http://localhost:5000/admin/products");

  const {
    data: revenueData,
    isPending: revenuePending,
    error: revenueError,
  } = useFetch("http://localhost:5000/admin/revenue");
  const {
    data: purchasedData,
    isPending: purchasedPending,
    error: purchasedError,
  } = useFetch("http://localhost:5000/admin/purchase");

  const [numUsers, setNumUsers] = useState(0);
  const [numItems, setNumItems] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [revenueDataPoints, setRevenueDataPoints] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    if (dbData) {
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
      console.log("Full Revenue Data:", revenueData);

      if (
        revenueData.monthly &&
        Array.isArray(revenueData.monthly) &&
        revenueData.monthly.length > 0
      ) {
        setTotalRevenue(revenueData.totalRevenue);

        // Prepare cumulative revenue data for the graph
        const cumulativeData = revenueData.monthly.map((entry, index) => ({
          month: entry.month,
          totalRevenue: revenueData.monthly
            .slice(0, index + 1)
            .reduce((acc, current) => acc + current.revenue, 0),
        }));

        setRevenueDataPoints(cumulativeData);
        setMonthlyRevenue(revenueData.monthly);
      } else {
        console.warn("Monthly data is missing or empty");
        setRevenueDataPoints([]);
        setMonthlyRevenue([]);
      }
    }
  }, [revenueData]);

  useEffect(() => {
    if (purchasedData) {
      setTotalPurchased(purchasedData.totalQuantity);
    }
  }, [purchasedData]);

  if (userPending || dbPending || revenuePending || purchasedPending)
    return <Spinner />;
  if (userError || dbError || revenueError || purchasedError)
    return (
      <div>Error: {userError || dbError || revenueError || purchasedError}</div>
    );

  console.log("Revenue Data Points:", revenueDataPoints);

  const pieData = [
    { name: "Total Products", value: numItems },
    { name: "Total Orders", value: totalPurchased },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="w-full mx-auto p-6 bg-[#172F4A] from-gray-100 to-gray-200 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-8 p-4 rounded-md shadow-lg">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
        {/* Left Column for Cards */}
        <div className="space-y-6">
          <div className="bg-[#193351] rounded-lg shadow-md p-6 h-32 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              {/* Icon for Number of Users */}
              <svg
                className="w-8 h-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 14l-4-4m0 0l-4 4m4-4v12"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Number of Users</h2>
              <p className="text-3xl font-bold">{numUsers}</p>
            </div>
          </div>

          <div className="bg-[#193351]rounded-lg shadow-md p-6 h-32 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              {/* Icon for Total Revenue */}
              <svg
                className="w-8 h-8 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 4c-3.039 0-5.5 2.46-5.5 5.5S8.961 23 12 23s5.5-2.461 5.5-5.5S15.039 12 12 12zm0 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
              <p className="text-3xl font-bold">
                ₹ {totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column for Round Colorful Graph */}
        <div className="space-y-6">
          <div className="bg-[#193351] rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Products and Orders Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full Width Graphs */}
      <div className="space-y-6">
        {/* Total Revenue Over Time Graph */}
        <div className="bg-[#193351] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Total Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueDataPoints}>
              <XAxis dataKey="month" />
              <YAxis dataKey="totalRevenue" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Bar Chart */}
        <div className="bg-[#193351] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
