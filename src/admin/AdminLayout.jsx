import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <header className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Admin Panel</h1>
      <nav className="space-x-4">
        <Link to="/admin" className="hover:underline">Dashboard</Link>
        <Link to="/admin/complaints" className="hover:underline">Complaints</Link>
        <Link to="/admin/users" className="hover:underline">Users</Link>
        <Link to="/admin/companies" className="hover:underline">Companies</Link>
      </nav>
    </header>
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
