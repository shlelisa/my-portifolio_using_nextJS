import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/supabase/supabaseClient";






const cardStyle: React.CSSProperties = {
  backgroundColor: "#f0f4ff",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  textAlign: "center",
  transition: "transform 0.2s ease",
  cursor: "pointer",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#1e3a8a",
  marginBottom: "10px",
};

const cardDataStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#2563eb",
};

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<number | undefined>();
  const [contact, setContact] = useState<number | undefined>();
  const [skills, setSkills] = useState<number | undefined>();
  const [projects, setProjects] = useState<number | undefined>();

  const fetchBlogsNumber = async () => {
    const { data, error } = await supabase.from("blogs").select("*");

    if (error) {
      console.error("Error fetching blogs:", error.message);
    } else {
      setBlogs(data.length);
    }
  };

  const fetchContactNumber = async () => {
    const { data, error } = await supabase.from("contact").select("*");

    if (error) {
      console.error("Error fetching blogs:", error.message);
    } else {
      setContact(data.length);
    }
  };

  const fetchSkillNumber = async () => {
    const { data, error } = await supabase.from("skills").select("*");

    if (error) {
      console.error("Error fetching blogs:", error.message);
    } else {
      setSkills(data.length);
    }
  };

  const fetchProjectNumber = async () => {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      console.error("Error fetching blogs:", error.message);
    } else {
      setProjects(data.length);
    }
  };

  useEffect(() => {
    fetchBlogsNumber();
    fetchContactNumber();
    fetchSkillNumber();
    fetchProjectNumber();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {/* Card 1: Blogs */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>📝 Blogs Posted</h3>
        <p style={cardDataStyle}>{blogs}</p>
      </div>

      {/* Card 2: Contacts */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>📬 Contact Messages</h3>
        <p style={cardDataStyle}>{contact}</p>
      </div>

      {/* Card 3: Skills */}


      <div style={cardStyle}
      >
        <h3 style={cardTitleStyle}>🛠️ Skills Updated</h3>
        <p style={cardDataStyle}>{skills}</p>
      </div>

      {/* Card 4: Projects */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>📁 Projects Added</h3>
        <p style={cardDataStyle}>{projects}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
