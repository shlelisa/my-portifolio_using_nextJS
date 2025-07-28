import React from 'react';

const AdminFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1E293B', // Tailwind's slate-800
    padding: '1rem 0',
    marginTop: 'auto',
    color: '#fff',
    textAlign: 'center' as const,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  text: {
    fontSize: '14px',
  },
};

export default AdminFooter;
