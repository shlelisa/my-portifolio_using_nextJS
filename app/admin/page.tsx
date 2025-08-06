'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/supabase/supabaseClient';

import AddBlog from './blogs/AddBlog';
import AdminDashboard from './dashboard/AdminDashboard';
import Contact from './contact/Contact';
import Skill from './skills/skill';
import Project from './project/project';

const AdminPanel = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);






const [showDropdown, setShowDropdown] = useState(false);

const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push('/admin/login');
};


  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login'); // Redirect if no session
      } else {
        setLoading(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push('/admin/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 100 }}>Checking session...</p>;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'addBlog':
        return <AddBlog />;
      case 'contact':
        return <Contact />;
      case 'skills':
        return <Skill />;
      case 'projects':
        return <Project />;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };






return (
  <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
    {/* Sidebar */}
    <aside
      style={{
        width: '250px',
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '20px 10px',
        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'center' }}>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <button onClick={() => setActiveTab('dashboard')} style={buttonStyle(activeTab === 'dashboard')}>
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('addBlog')} style={buttonStyle(activeTab === 'addBlog')}>
              Post Blog
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('contact')} style={buttonStyle(activeTab === 'contact')}>
              Contact Messages
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('skills')} style={buttonStyle(activeTab === 'skills')}>
              Update Skills
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('projects')} style={buttonStyle(activeTab === 'projects')}>
              Add Projects
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    {/* Main Content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <header style={{ backgroundColor: '#fff', padding: '15px 30px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              backgroundColor: '#1e293b',
              color: '#fff',
              padding: '10px 16px',
              fontSize: '14px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Admin ▾
          </button>
          {showDropdown && (
            <ul
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                listStyle: 'none',
                padding: '10px 0',
                margin: 0,
                minWidth: '150px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
              }}
            >
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '10px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: '#f9fafb' }}>
        {renderContent()}
      </main>
    </div>
  </div>
);

};

const buttonStyle = (active: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '12px 10px',
  backgroundColor: active ? '#2563eb' : 'transparent',
  color: active ? '#fff' : '#cbd5e1',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '16px',
  borderRadius: '4px',
  marginBottom: '10px',
  transition: 'background 0.2s ease'
});

export default AdminPanel;
