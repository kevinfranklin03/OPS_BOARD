import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", minStock: "", vendorId: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch inventory
  const fetchInventory = async () => {
    const snapshot = await getDocs(collection(db, "inventory"));
    setInventory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Fetch vendors
  const fetchVendors = async () => {
    const snapshot = await getDocs(collection(db, "vendors"));
    setVendors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchInventory();
    fetchVendors();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "inventory"), {
      name: form.name,
      quantity: Number(form.quantity),
      minStock: Number(form.minStock),
      vendorId: form.vendorId,
    });
    setForm({ name: "", quantity: "", minStock: "", vendorId: "" });
    fetchInventory();
  };

  const handleSave = async (id) => {
    await updateDoc(doc(db, "inventory", id), {
      name: form.name,
      quantity: Number(form.quantity),
      minStock: Number(form.minStock),
      vendorId: form.vendorId,
    });
    setEditingId(null);
    setForm({ name: "", quantity: "", minStock: "", vendorId: "" });
    fetchInventory();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteDoc(doc(db, "inventory", id));
      fetchInventory();
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
  };

  const getVendorName = (id) => {
    const v = vendors.find((v) => v.id === id);
    return v ? v.name : id;
  };

  return (
    <div className="min-h-screen bg-beige px-6 py-10 space-y-12">
      {/* Add Inventory Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center">Add Inventory Item</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input className="w-full border px-4 py-2 rounded" placeholder="Item Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full border px-4 py-2 rounded" type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
          <input className="w-full border px-4 py-2 rounded" type="number" placeholder="Minimum Stock" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} required />

          {/* Vendor Dropdown */}
          <select className="w-full border px-4 py-2 rounded" value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })} required>
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <button className="w-full bg-primary text-white py-2 rounded hover:bg-gray-800">➕ Add Inventory</button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-4">Inventory List</h2>
        <table className="w-full border text-sm rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Min Stock</th>
              <th className="p-2">Vendor</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  {editingId === item.id ? (
                    <input className="border px-2 py-1 rounded w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  ) : item.name}
                </td>
                <td className="p-2">
                  {editingId === item.id ? (
                    <input className="border px-2 py-1 rounded w-full" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                  ) : item.quantity}
                </td>
                <td className="p-2">
                  {editingId === item.id ? (
                    <input className="border px-2 py-1 rounded w-full" type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} />
                  ) : item.minStock}
                </td>
                <td className="p-2">
                  {editingId === item.id ? (
                    <select className="border px-2 py-1 rounded w-full" value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })}>
                      <option value="">Select Vendor</option>
                      {vendors.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  ) : getVendorName(item.vendorId)}
                </td>
                <td className="p-2 flex gap-2">
                  {editingId === item.id ? (
                    <button onClick={() => handleSave(item.id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
