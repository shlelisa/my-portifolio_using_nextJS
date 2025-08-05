'use client';

import React, { useState } from 'react';
import AddBlog from './blogs/AddBlog';
import AdminDashboard from './dashboard/AdminDashboard';
import Contact from './contact/Contact';
import Skill from './skills/skill';
// Add your other components like ContactForm, SkillsEditor, ProjectManager

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard/>;
      case 'addBlog':
        return <AddBlog />;
      case 'contact':
        return <Contact />;
      case 'skills':
        return <Skill/>;
      case 'projects':
        return <p>📁 Project manager coming soon.</p>;
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
              <button
                onClick={() => setActiveTab('dashboard')}
                style={buttonStyle(activeTab === 'dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('addBlog')}
                style={buttonStyle(activeTab === 'addBlog')}
              >
                Post Blog
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('contact')}
                style={buttonStyle(activeTab === 'contact')}
              >
                Contact Messages
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('skills')}
                style={buttonStyle(activeTab === 'skills')}
              >
                Update Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('projects')}
                style={buttonStyle(activeTab === 'projects')}
              >
                Add Projects
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: '40px',
          backgroundColor: '#f9fafb'
        }}
      >
        {renderContent()}
      </main>
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
