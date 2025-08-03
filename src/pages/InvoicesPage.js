import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ vendorId: "", amount: "", status: "unpaid" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInvoices();
    fetchVendors();
  }, []);

  const fetchInvoices = async () => {
    const snapshot = await getDocs(collection(db, "invoices"));
    setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchVendors = async () => {
    const snapshot = await getDocs(collection(db, "vendors"));
    setVendors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const getVendorName = (id) => {
    const v = vendors.find((v) => v.id === id);
    return v ? v.name : id;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "invoices"), {
      vendorId: form.vendorId,
      amount: Number(form.amount),
      status: form.status
    });
    setForm({ vendorId: "", amount: "", status: "unpaid" });
    fetchInvoices();
  };

  const handleSave = async (id) => {
    await updateDoc(doc(db, "invoices", id), {
      vendorId: form.vendorId,
      amount: Number(form.amount),
      status: form.status
    });
    setEditingId(null);
    setForm({ vendorId: "", amount: "", status: "unpaid" });
    fetchInvoices();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this invoice?")) {
      await deleteDoc(doc(db, "invoices", id));
      fetchInvoices();
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
  };

  return (
    <div className="min-h-screen bg-beige px-6 py-10 space-y-12">
      {/* Add Invoice Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center">Add Invoice</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <select
            className="w-full border px-4 py-2 rounded"
            value={form.vendorId}
            onChange={(e) => setForm({ ...form, vendorId: e.target.value })}
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <input
            className="w-full border px-4 py-2 rounded"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <select
            className="w-full border px-4 py-2 rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
          <button className="w-full bg-primary text-white py-2 rounded hover:bg-gray-800">
            ➕ Add Invoice
          </button>
        </form>
      </div>

      {/* Invoice Table */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-primary mb-4">Invoices</h2>
        <table className="w-full border text-sm rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">Vendor</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="p-2">
                  {editingId === invoice.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={form.vendorId}
                      onChange={(e) => setForm({ ...form, vendorId: e.target.value })}
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getVendorName(invoice.vendorId)
                  )}
                </td>
                <td className="p-2">
                  {editingId === invoice.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    />
                  ) : (
                    `$${invoice.amount}`
                  )}
                </td>
                <td className="p-2">
                  {editingId === invoice.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  ) : (
                    <span className={invoice.status === "paid" ? "text-green-600" : "text-red-600"}>
                      {invoice.status}
                    </span>
                  )}
                </td>
                <td className="p-2 flex gap-2">
                  {editingId === invoice.id ? (
                    <button onClick={() => handleSave(invoice.id)} className="bg-green-600 text-white px-3 py-1 rounded">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(invoice)} className="bg-blue-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDelete(invoice.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
