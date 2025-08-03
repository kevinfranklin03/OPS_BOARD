import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const InventoryForm = () => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    minStock: "",
    vendorId: ""
  });

  const [vendors, setVendors] = useState([]);

  // Fetch all vendors once when the form mounts
  useEffect(() => {
    const fetchVendors = async () => {
      const snapshot = await getDocs(collection(db, "vendors"));
      const vendorList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVendors(vendorList);
    };
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "inventory"), {
      name: form.name,
      quantity: Number(form.quantity),
      minStock: Number(form.minStock),
      vendorId: form.vendorId
    });

    alert("✅ Inventory item added!");
    setForm({ name: "", quantity: "", minStock: "", vendorId: "" });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-primary text-center">Add Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          className="w-full border px-4 py-2 rounded"
          type="number"
          placeholder="Minimum Stock"
          value={form.minStock}
          onChange={(e) => setForm({ ...form, minStock: e.target.value })}
          required
        />

        {/* ✅ Dropdown Vendor Selector */}
        <select
          value={form.vendorId}
          onChange={(e) => setForm({ ...form, vendorId: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-gray-800"
        >
          ➕ Add Inventory
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
