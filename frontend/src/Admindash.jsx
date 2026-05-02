import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://bookwebsite-4q2b.onrender.com/earnings",
          { withCredentials: true }
        );

        setData(res.data);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm opacity-60">Total Revenue</p>
          <p className="text-xl font-semibold">₹{data.totalRevenue}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm opacity-60">Owner Profit</p>
          <p className="text-xl font-semibold text-green-400">
            ₹{data.ownerProfit}
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm opacity-60">Total Watchtime</p>
          <p className="text-xl font-semibold">
            {data.totalWatchTime} sec
          </p>
        </div>

      </div>

     
      <div className="bg-white/5 rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-white/10 text-sm">
            <tr>
              <th className="p-3">Creator Email</th>
              <th className="p-3">Watch Time</th>
              <th className="p-3">Earning</th>
            </tr>
          </thead>

          <tbody>
            {data.creators.map((c, index) => (
              <tr
                key={index}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.watchTime} sec</td>
                <td className="p-3 text-green-400">
                  ₹{c.earning}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}