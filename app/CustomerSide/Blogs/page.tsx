'use client'

import React, { useEffect, useState } from "react";

import { neon } from "@netlify/neon";

const sql = neon(); // automatically use netlify database url

const Blogs = () => {
  const [posts, setPosts] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const rows = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
        setPosts(rows);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

//   const blogPosts = [
//     {
//       id: 1,
//       title: "Getting Started with Web Development",
//       summary:
//         "An introductory guide to HTML, CSS, and JavaScript for aspiring developers.",
//       author: "Lelisa Shashura",
//       date: "July 28, 2025",
//       image: "/assets/blog1.jpg",
//     },
//     {
//       id: 2,
//       title: "Why React is a Game Changer",
//       summary:
//         "Explore the benefits of React and how it simplifies frontend development.",
//       author: "Lelisa Shashura",
//       date: "July 24, 2025",
//       image: "/assets/blog2.jpg",
//     },
//     {
//       id: 3,
//       title: "Deploying Websites with Vercel",
//       summary:
//         "Learn how to deploy your React or Next.js apps using Vercel in minutes.",
//       author: "Lelisa Shashura",
//       date: "July 20, 2025",
//       image: "/assets/blog3.jpg",
//     },
//   ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Our Latest Blogs
      </h2>

      {posts.length === 0 ? (
        <p> No Posts found.</p>
      ) : (
        posts.map((post) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.summary}</p>
                <div className="text-sm text-gray-500">
                  By <span className="font-medium">{post.author}</span> •{" "}
                  {post.date}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
