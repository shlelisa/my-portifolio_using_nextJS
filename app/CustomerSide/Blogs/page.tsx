'use client';

import React from "react";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      summary: "An introductory guide to HTML, CSS, and JavaScript for aspiring developers.",
      author: "Lelisa Shashura",
      date: "July 28, 2025",
      image: "/assets/blog1.jpg",
    },
    {
      id: 2,
      title: "Why React is a Game Changer",
      summary: "Explore the benefits of React and how it simplifies frontend development.",
      author: "Lelisa Shashura",
      date: "July 24, 2025",
      image: "/assets/blog2.jpg",
    },
    {
      id: 3,
      title: "Deploying Websites with Vercel",
      summary: "Learn how to deploy your React or Next.js apps using Vercel in minutes.",
      author: "Lelisa Shashura",
      date: "July 20, 2025",
      image: "/assets/blog3.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">Our Latest Blogs</h2>

      {blogPosts.length === 0 ? (
        <p className="text-center text-gray-500">No Posts found.</p>
      ) : (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">
                  {post.summary}
                </p>
                <div className="text-sm text-gray-500">
                  By <span className="font-medium">{post.author}</span> • {post.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
