'use client';
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';




const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-blue-100 via-white to-blue-100 text-black py-12 px-6 mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        
        {/* About Me */}
        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-4">About Me</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            I&apos;m <strong>Lelisa Shashura</strong>, a dedicated Software Developer passionate about creating clean, modern, and responsive web applications using the latest tech stack.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-700">
            <li><a href="#hero" className="hover:text-blue-500 transition">Home</a></li>
            <li><a href="#about" className="hover:text-blue-500 transition">About</a></li>
            <li><a href="#skills" className="hover:text-blue-500 transition">Skills</a></li>
            <li><a href="#projects" className="hover:text-blue-500 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold text-blue-800 mb-4">Connect with Me</h3>
          <div className="flex justify-center md:justify-start space-x-5 text-gray-700">
            <a
              href="https://github.com/shlelisa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black hover:scale-110 transition-transform"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/lelisa-shashura-4935a2259/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 hover:scale-110 transition-transform"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:lelisa.shashura@bhu.edu.et"
              className="hover:text-red-500 hover:scale-110 transition-transform"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-600 mt-8">
        © {new Date().getFullYear()} <span className="font-semibold">Lelisa Shashura</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
