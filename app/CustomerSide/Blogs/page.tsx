'use client';
import {supabase} from '@/app/supabase/supabaseClient';
import React from "react";

const Blogs = () => {
  const blogPosts = [

{
    id: 4,
    title: "Getting Started with Node.js for Backend Development",
    summary: "Explore the basics of Node.js and how it powers modern web backends with asynchronous, event-driven architecture.",
    author: "Lelisa Shashura",
    date: "2025-08-02",
    image: "data:image/png;base64,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"
  },
  {
    id: 5,
    title: "Building Full-Stack Applications with the MERN Stack",
    summary: "Learn how to integrate MongoDB, Express, React, and Node.js to create powerful full-stack applications from scratch.",
    author: "Lelisa Shashura",
    date: "2025-07-30",
    image: "data:image/png;base64,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"
  },
  {
    id: 6,
    title: "Deploying Your Web App with Vercel and Netlify",
    summary: "A step-by-step guide to deploying modern web applications quickly and efficiently using Vercel and Netlify.",
    author: "Lelisa Shashura",
    date: "2025-07-28",
    image: "data:image/png;base64,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"
  },
  {
    id: 7,
    title: "Supabase Authentication: A Simple Guide",
    summary: "Secure your web apps using Supabase’s built-in authentication system. Learn to set up sign-in, sign-up, and protected routes easily.",
    author: "Lelisa Shashura",
    date: "2025-07-25",
    image: "https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png"
  }
  ];



const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  } else {
    fetchBlogs();
  }
};



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
