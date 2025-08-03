import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
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
    datasets: [{
      data: [paid, unpaid],
      backgroundColor: ["#36A2EB", "#FF6384"],
    }]
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold text-primary text-center">Invoice Status Overview</h3>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
