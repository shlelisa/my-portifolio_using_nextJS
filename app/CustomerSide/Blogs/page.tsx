'use client';
import {supabase} from '@/app/supabase/supabaseClient';
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  message: string;
  author: string;
  image: string;
  created_at: Date;
}





const Blogs = () =>{

  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  } else {
    return data;
  }
};


useEffect(() => {
  const getBlogs = async () => {
    const data = await fetchBlogs();
    if (data) {
      setBlogPosts(data);
    }
  };
  getBlogs();
}, []);


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
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">
                  {post.message}
                </p>
                <div className="text-sm text-gray-500">
                  By <span className="font-medium">{post.author}</span> • {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Unknown Date'}
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
