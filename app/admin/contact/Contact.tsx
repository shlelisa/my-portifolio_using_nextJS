"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/supabase/supabaseClient";
import Papa from "papaparse";

const ContactTable = () => {
  type Contact = {
    id: number;
    name: string;
    email: string;
    title: string;
    message: string;
    created_at: string;
  };

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [viewedContact, setViewedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase.from("contact").select("*");
    if (error) console.error("Error fetching contacts:", error.message);
    else setContacts(data || []);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmed) return;

    const { error } = await supabase.from("contact").delete().eq("id", id);
    if (error) console.error("Delete failed:", error.message);
    else fetchContacts();
  };

  const handleView = (contact: Contact) => {
    setViewedContact(contact);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(contacts);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = contacts.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "100%",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >
      <h2
        style={{ fontSize: "26px", marginBottom: "20px", textAlign: "center" }}
      >
        📨 Contact Messages
      </h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, email or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
        <button
          onClick={handleExportCSV}
          style={{
            padding: "10px 16px",
            backgroundColor: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Id</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Received At</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <tr key={contact.id}>
                  <td style={tdStyle}>{contact.id}</td>
                  <td style={tdStyle}>{contact.name}</td>
                  <td style={tdStyle}>{contact.email}</td>
                  <td style={tdStyle}>{contact.title}</td>
                  <td style={tdStyle}>
                    {contact.message && contact.message.length > 50
                      ? contact.message.substring(0, 50) + "..."
                      : contact.message}
                  </td>
                  <td style={tdStyle}>
                    {new Date(contact.created_at).toLocaleString()}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleView(contact)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "6px 12px",
                margin: "0 4px",
                backgroundColor: currentPage === i + 1 ? "#3b82f6" : "#e5e7eb",
                color: currentPage === i + 1 ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* View Modal */}
      {isModalOpen && viewedContact && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "500px",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h3 style={{ fontSize: "22px", marginBottom: "12px" }}>
              {viewedContact.title}
            </h3>
            <p>
              <strong>Name:</strong> {viewedContact.name}
            </p>
            <p>
              <strong>Email:</strong> {viewedContact.email}
            </p>
            <p>
              <strong>Message:</strong>
            </p>
            <p style={{ marginTop: "10px", lineHeight: "1.5" }}>
              {viewedContact.message}
            </p>
            <p
              style={{ marginTop: "10px", fontSize: "13px", color: "#6b7280" }}
            >
              Received on: {new Date(viewedContact.created_at).toLocaleString()}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                backgroundColor: "#6b7280",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "10px 14px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #e5e7eb",
  backgroundColor: "#f3f4f6",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "14px",
  verticalAlign: "top",
  borderBottom: "1px solid #e5e7eb",
};

export default ContactTable;
