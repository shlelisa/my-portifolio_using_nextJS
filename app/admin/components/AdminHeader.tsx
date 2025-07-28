// app/admin/components/AdminHeader.tsx or wherever you store your components
'use client';

import React from 'react';
import Link from 'next/link';

const AdminHeader = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-2xl font-extrabold text-blue-600 mb-10 tracking-wide">
          AdminPanel
        </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/AdminDashboard"
                className="block py-2 px-4 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="block py-2 px-4 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reports"
                className="block py-2 px-4 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="block py-2 px-4 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome to Admin Panel
        </h1>
        {/* Additional dashboard content goes here */}
      </main>
    </div>
  );
};

export default AdminHeader;
