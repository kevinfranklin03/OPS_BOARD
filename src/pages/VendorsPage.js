import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", contactEmail: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchVendors = async () => {
    const snapshot = await getDocs(collection(db, "vendors"));
    setVendors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "vendors"), form);
    setForm({ name: "", contactEmail: "" });
    fetchVendors();
  };

  const handleSave = async (id) => {
    await updateDoc(doc(db, "vendors", id), form);
    setEditingId(null);
    setForm({ name: "", contactEmail: "" });
    fetchVendors();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this vendor?")) {
      await deleteDoc(doc(db, "vendors", id));
      fetchVendors();
    }
  };

  const handleEdit = (vendor) => {
    setEditingId(vendor.id);
    setForm({ ...vendor });
  };

  return (
    <div className="min-h-screen bg-beige px-6 py-10 space-y-12">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center">Add Vendor</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input className="w-full border px-4 py-2 rounded" placeholder="Vendor Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full border px-4 py-2 rounded" placeholder="Contact Email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required />
          <button className="w-full bg-primary text-white py-2 rounded hover:bg-gray-800">➕ Add Vendor</button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-4">Vendor List</h2>
        <table className="w-full border text-sm rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-t">
                <td className="p-2">
                  {editingId === v.id ? (
                    <input className="border px-2 py-1 rounded w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  ) : v.name}
                </td>
                <td className="p-2">
                  {editingId === v.id ? (
                    <input className="border px-2 py-1 rounded w-full" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
                  ) : v.contactEmail}
                </td>
                <td className="p-2 flex gap-2">
                  {editingId === v.id ? (
                    <button onClick={() => handleSave(v.id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(v)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  )}
                  <button onClick={() => handleDelete(v.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorsPage;
