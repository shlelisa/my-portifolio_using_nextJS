"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const Project = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technology: "",
    features: "",
    image_urls: [] as string[],
  });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) console.error("Error fetching projects:", error.message);
    else setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles(e.target.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrls: string[] = [];
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage.from("project-images").upload(filePath, file);
        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          alert("Failed to upload image.");
          setUploading(false);
          return;
        }

        const { data: publicUrl } = supabase.storage.from("project-images").getPublicUrl(filePath);
        imageUrls.push(publicUrl.publicUrl);
      }
    }

    const payload = {
      ...formData,
      image_urls: imageUrls.length ? imageUrls : formData.image_urls,
    };

    let response;
    if (editingId) {
      response = await supabase.from("projects").update(payload).eq("id", editingId);
    } else {
      response = await supabase.from("projects").insert([payload]);
    }

    if (response.error) alert("Error saving project: " + response.error.message);
    else {
      alert(editingId ? "Project updated!" : "Project added!");
      fetchProjects();
      setFormData({ title: "", description: "", technology: "", features: "", image_urls: [] });
      setImageFiles(null);
      setModalOpen(false);
      setEditingId(null);
    }
    setUploading(false);
  };

  const handleEdit = (project: any) => {
    setFormData(project);
    setModalOpen(true);
    setEditingId(project.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) alert("Error deleting project: " + error.message);
      else fetchProjects();
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Project Management</h2>

      <button
        onClick={() => {
          setFormData({ title: "", description: "", technology: "", features: "", image_urls: [] });
          setModalOpen(true);
          setEditingId(null);
        }}
        style={{ padding: 10, backgroundColor: "#007bff", color: "white", border: "none", marginBottom: 20 }}
      >
        Add New Project
      </button>

     <table style={{
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
  fontFamily: "Arial, sans-serif",
}}>
  <thead>
    <tr style={{
      backgroundColor: "#f5f5f5",
      color: "#333",
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "16px",
    }}>
      <th style={{ padding: "12px 16px" }}>Title</th>
      <th style={{ padding: "12px 16px" }}>Technology</th>
      <th style={{ padding: "12px 16px" }}>Features</th>
      <th style={{ padding: "12px 16px" }}>Details</th>
      <th style={{ padding: "12px 16px" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {projects.map((project) => (
      <tr key={project.id}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <td style={{ padding: "12px 16px" }}>{project.title}</td>
        <td style={{ padding: "12px 16px" }}>{project.technology}</td>
        <td style={{ padding: "12px 16px" }}>{project.features}</td>
        <td style={{ padding: "12px 16px" }}>{project.description}</td>
        <td style={{ padding: "12px 16px" }}>
          <button
            onClick={() => handleEdit(project)}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "6px 12px",
              marginRight: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={e => ((e.target as HTMLButtonElement).style.backgroundColor = "#45a049")}
            onMouseOut={e => ((e.target as HTMLButtonElement).style.backgroundColor = "#4CAF50")}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(project.id)}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={e => ((e.target as HTMLButtonElement).style.backgroundColor = "#e53935")}
            onMouseOut={e => ((e.target as HTMLButtonElement).style.backgroundColor = "#f44336")}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {modalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "20px",
    }}
  >
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "600px",
        padding: "30px",
        overflowY: "auto",
        maxHeight: "90vh",
        fontFamily: "Arial",
        transition: "transform 0.3s ease",
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center", color: "#333" }}>
        {editingId ? "Edit Project" : "Add Project"}
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Project Title"
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <textarea
        name="technology"
        value={formData.technology}
        onChange={handleInputChange}
        placeholder="Project Technology"
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <textarea
        name="features"
        value={formData.features}
        onChange={handleInputChange}
        placeholder="Project Features"
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Project Description"
        required
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px 20px",
            backgroundColor: uploading ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {uploading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
};

export default Project;
