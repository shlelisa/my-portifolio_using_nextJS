import React from 'react';

interface DashboardCardProps {
  title: string;
  count: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
    <h3 className="text-xl font-bold text-gray-700">{title}</h3>
    <p className="text-3xl font-semibold text-blue-600">{count}</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        <main className="p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Welcome, Admin!</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <DashboardCard title="Blogs" count="12" />
            <DashboardCard title="Projects" count="8" />
            <DashboardCard title="Skills" count="10" />
            <DashboardCard title="Messages" count="3" />
            <DashboardCard title="Contact Info" count="1" />
            <DashboardCard title="Photos" count="5" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
