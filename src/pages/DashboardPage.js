import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [paid, setPaid] = useState(0);
  const [unpaid, setUnpaid] = useState(0);

  useEffect(() => {
    const fetchInvoices = async () => {
      const snapshot = await getDocs(collection(db, "invoices"));
      const invoices = snapshot.docs.map(doc => doc.data());
      setPaid(invoices.filter(i => i.status === "paid").length);
      setUnpaid(invoices.filter(i => i.status === "unpaid").length);
    };
    fetchInvoices();
  }, []);

  const data = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        data: [paid, unpaid],
        backgroundColor: ["#4ade80", "#f87171"], // green & red
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-primary text-center mb-4">Invoice Payment Status</h2>
        <Pie data={data} />
        <div className="text-center mt-4 text-sm text-gray-600">
          Total: {paid + unpaid} invoices
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
