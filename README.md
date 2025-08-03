# 🧠 OpsBoard – Cloud ERP Dashboard

OpsBoard is a lightweight, Firebase-powered ERP dashboard for managing **invoices**, **inventory**, and **vendors**. Designed for SMEs and startups, it showcases modular ERP features with React, Firebase Firestore, and Tailwind CSS.

---

## 🚀 Video Demo



https://github.com/user-attachments/assets/2092c697-c6eb-4fbe-adc8-23836edf682c



---

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS  
- **Backend (Database):** Firebase Firestore  
- **Hosting:** Firebase Hosting  
- **Charting:** Chart.js (planned for dashboard metrics)

---

## 📦 Features

### 🔧 Vendor Management
- Add vendor with name & contact email
- View all vendors in a table
- Vendors are referenced in Inventory and Invoices

### 📦 Inventory Module
- Add/edit/delete inventory items
- Dynamic **low stock threshold** field
- Vendors selectable via dropdown
- Live list view with CRUD support

### 💰 Invoice Tracking
- Add/edit/delete invoices
- Select vendor from dropdown
- Mark status as **Paid** or **Unpaid**
- Invoice table supports inline editing

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/opsboard.git
cd opsboard

# 2. Install dependencies
npm install

# 3. Configure Firebase
# Create a .env file or update firebase.js with your config

# 4. Start the app
npm start
