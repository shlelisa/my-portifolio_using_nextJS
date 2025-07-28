import React from 'react';
import Header from './components/AdminHeader';
import Footer from './components/AdminFooter';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='admin-layout'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
