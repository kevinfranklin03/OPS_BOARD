import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const InvoiceForm = () => {
  const [vendorId, setVendorId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("unpaid");
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const snapshot = await getDocs(collection(db, "vendors"));
      setVendors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "invoices"), {
      vendorId,
      amount: Number(amount),
      status,
      date: new Date().toISOString()
    });
    setVendorId(""); setAmount(""); setStatus("unpaid");
    alert("Invoice added");
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-primary text-center">Add Invoice</h2>

        <select className="w-full px-4 py-2 border rounded-lg" value={vendorId} onChange={(e) => setVendorId(e.target.value)} required>
          <option value="">Select Vendor</option>
          {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>

        <input className="w-full px-4 py-2 border rounded-lg" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <select className="w-full px-4 py-2 border rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-gray-800 transition">Add Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
