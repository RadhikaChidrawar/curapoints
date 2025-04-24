import { useEffect, useState } from "react";
import axios from "axios";

const AdminEarnings = () => {
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      const res = await axios.get("http://localhost:PORT/admin/earnings", {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
      });
      if (res.data.success) {
        setEarnings(res.data.earnings);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Admin Earnings</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Doctor Name</th>
            <th className="border px-4 py-2">Appointments</th>
            <th className="border px-4 py-2">Total Fee</th>
            <th className="border px-4 py-2">Admin Commission (10%)</th>
            <th className="border px-4 py-2">Doctor Earnings (90%)</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((e, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{e.doctorName}</td>
              <td className="border px-4 py-2">{e.totalAppointments}</td>
              <td className="border px-4 py-2">₹{e.totalFee}</td>
              <td className="border px-4 py-2 text-green-600">₹{e.adminCommission}</td>
              <td className="border px-4 py-2 text-blue-600">₹{e.doctorEarnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEarnings;
