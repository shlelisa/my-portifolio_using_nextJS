'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase/supabaseClient';

type Blog = {
  id: number;
  title: string;
  message: string;
  author: string;
  image: string;
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '15px'
};

const AddBlogForm = () => {
  const [formData, setFormData] = useState({ title: '', message: '', author: '', image: '' });
  const [message1, setMessage1] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from('blogs').select('*');
    if (error) console.error('Error fetching blogs:', error.message);
    else setBlogs(data as Blog[]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId !== null) {
      const { error } = await supabase
        .from('blogs')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        console.error(error);
        setMessage1('❌ Failed to update blog.');
      } else {
        setMessage1('✅ Blog updated successfully!');
        resetForm();
      }
    } else {
      const { error } = await supabase.from('blogs').insert([formData]);
      if (error) {
        console.error(error);
        setMessage1('❌ Failed to add blog.');
      } else {
        setMessage1('✅ Blog added successfully!');
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', message: '', author: '', image: '' });
    setIsEditing(false);
    setEditingId(null);
    fetchBlogs();
    setTimeout(() => {
      setMessage1('');
      setShowModal(false);
    }, 1500);
  };

  const handleEdit = (blog: Blog) => {
    setFormData({ title: blog.title, message: blog.message, author: blog.author, image: blog.image });
    setEditingId(blog.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) {
        console.error('Delete error:', error.message);
      } else {
        fetchBlogs();
      }
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase()) ||
      blog.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2 style={{ fontSize: '26px', marginBottom: '20px', textAlign: 'center' }}>📃 Admin Blog Manager</h2>

      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setFormData({ title: '', message: '', author: '', image: '' });
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: '#fff',
            fontSize: '15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ➕ Add New Blog
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          marginBottom: '30px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '15px'
        }}
      />

      <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Author</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id}>
                <td style={tdStyle}>
                  <img
                    src={blog.image}
                    alt="blog"
                    style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                </td>
                <td style={tdStyle}>{blog.title}</td>
                <td style={tdStyle}>{blog.message.slice(0, 60)}...</td>
                <td style={tdStyle}>{blog.author}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(blog)}
                    style={{ marginRight: '10px', padding: '6px 10px', fontSize: '13px', cursor: 'pointer' }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    style={{
                      padding: '6px 10px',
                      fontSize: '13px',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999
          }}
        >
          <div
            style={{
              width: '90%',
              maxWidth: '500px',
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '10px',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ❌
            </button>
            <h3 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'center' }}>{isEditing ? '✏️ Edit Blog' : '➕ Add New Blog'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required style={inputStyle} />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required style={inputStyle} />
              <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required style={inputStyle} />
              <button type="submit" style={{ width: '100%', backgroundColor: '#3b82f6', color: '#fff', padding: '12px', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {isEditing ? '💾 Update Blog' : '➕ Submit Blog'}
              </button>
            </form>
            {message1 && <p style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>{message1}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left' as const,
  fontWeight: 'bold',
  borderBottom: '2px solid #e5e7eb',
  backgroundColor: '#f3f4f6'
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: '14px',
  verticalAlign: 'top',
  borderBottom: '1px solid #e5e7eb'
};

export default AddBlogForm;
