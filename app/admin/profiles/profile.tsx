"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { supabase } from "@/app/supabase/supabaseClient";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMailBulk,
  FaTelegram,
  FaVoicemail,
  FaYoutube,
} from "react-icons/fa";

type Profile = {
  youtube: string | undefined;
  telegram?: string;
  facebook?: string;

  id: string;
  firstName: string;

  middleName: string;

  lastName: string;
  profileTitle: string;
  title?: string;
  image_url?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  about?: string;
  experience?: string;
  skills?: string;
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Profile | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      setUploadingPhoto(true);
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${form?.id}-${Date.now()}.${fileExt}`;
      const filePath = `profile-photos/${fileName}`;

      const { data, error } = await supabase.storage
        .from("photo")
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("photo")
        .getPublicUrl(filePath);

      const newImageUrl = publicUrlData.publicUrl;

      //update only image_url in profiles table
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ image_url: newImageUrl })
        .eq("id", form?.id);

      if (updateError) throw updateError;

      setForm({ ...form!, image_url: newImageUrl });
      setProfile({ ...profile!, image_url: newImageUrl });
      setSuccessMessage("Profile photo updated!");
      setTimeout(() => setSuccessMessage(""), 1000);
    } catch (err: any) {
      console.error("Error uploading photo:", err.message);
    } finally {
      setUploadingPhoto(false);
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching profile:", error?.message || error);
      } else {
        setProfile(data);
        setForm(data);
      }
    };

    getProfileData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form) return;

    const updateData = {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      profileTitle: form.profileTitle,
      image_url: form.image_url,
      linkedin: form.linkedin,
      github: form.github,
      email: form.email,
      about: form.about,
      experience: form.experience,
    };

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", form.id);

    if (error) {
      console.error("Update error:", error.message);
    } else {
      setProfile(form);
      setEditMode(false);
      setSuccessMessage("Profile loaded successfully!");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  if (!profile || !form) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", color: "#666" }}>
        Loading profile...
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    padding: "8px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "6px",
    marginBottom: "14px",
    fontSize: "1rem",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: "500",
    marginBottom: "4px",
    display: "block",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          padding: "40px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {form.image_url && (
            <Image
              src={form.image_url}
              alt="Profile"
              width={150}
              height={150}
              style={{ borderRadius: "50%", border: "4px solid #3b82f6" }}
            />
          )}

          <div style={{ marginTop: "10px" }}>
            <label
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                display: "inline-block",
              }}
            >
              {uploadingPhoto ? "Uploading..." : "Edit Photo"}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <div style={{ flex: 1 }}>
            {editMode ? (
              <>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <label style={labelStyle}>Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  name="profileTitle"
                  value={form.profileTitle}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <label style={labelStyle}>Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </>
            ) : (
              <>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#2563eb",
                    marginBottom: "6px",
                  }}
                >
                  {profile.firstName}
                </h1>
                <p style={{ fontSize: "18px", color: "#4b5563" }}>
                  {profile.title}
                </p>
              </>
            )}

            {/* Socials */}
            {editMode ? (
              <>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <label style={labelStyle}>LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <label style={labelStyle}>GitHub</label>
                <input
                  type="text"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </>
            ) : (
              <div style={{ marginTop: "10px" }}>
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginRight: "15px",
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: 500,
                    }}
                  >
                    <FaLinkedin size={30} style={{ color: "#0A66C2" }} />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginRight: "15px",
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: 500,
                    }}
                  >
                    <FaGithub size={30} style={{ color: "$181717" }} />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: 500,
                      padding: "0 5px",
                    }}
                  >
                    <FaEnvelope size={30} style={{ color: "#D44638" }} />
                  </a>
                )}

                {profile.facebook && (
                  <a
                    href={profile.facebook}
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: 500,
                      padding: "0 5px",
                    }}
                  >
                    <FaFacebook size={30} style={{ color: "#1877F2" }} />
                  </a>
                )}

                {profile.telegram && (
                  <a
                    href={profile.telegram}
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: 500,
                      padding: "0 5px",
                    }}
                  >
                    <FaTelegram size={30} style={{ color: "#0088cc" }} />
                  </a>
                )}

                {profile.youtube && (
                  <a
                    href={profile.youtube}
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: 500,
                      padding: "0 5px",
                    }}
                  >
                    <FaYoutube size={30} style={{ color: "#FF0000" }} />
                    Youtube
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* About Me */}
        <section style={{ marginTop: "40px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#111827",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "4px",
              marginBottom: "12px",
            }}
          >
            About Me
          </h2>
          {editMode ? (
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              style={{ ...inputStyle, height: "120px" }}
            />
          ) : (
            <div style={{ lineHeight: "1.7", color: "#374151" }}>
              <ReactMarkdown>{profile.about}</ReactMarkdown>
            </div>
          )}
        </section>

        {/* Experience */}
        <section style={{ marginTop: "40px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#111827",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "4px",
              marginBottom: "12px",
            }}
          >
            Experience
          </h2>
          {editMode ? (
            <textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              style={{ ...inputStyle, height: "120px" }}
            />
          ) : (
            <div style={{ lineHeight: "1.7", color: "#374151" }}>
              <ReactMarkdown>{profile.experience}</ReactMarkdown>
            </div>
          )}
        </section>

        {/* Buttons */}
        <div style={{ marginTop: "30px" }}>
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#10b981",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                style={{
                  backgroundColor: "#e5e7eb",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </button>
              {successMessage && (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  {successMessage}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
