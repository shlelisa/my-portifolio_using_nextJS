"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // You can install lucide-react or use any other icon

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-800">
          <Link href="/">LOGO</Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-gray-800 font-medium text-lg">
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/Blogs">Blogs</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/components/About">About</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/">Skills</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/projects">Projects</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/ContactUs">ContactUs</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 bg-white px-6 pb-6 text-gray-800 font-medium text-lg animate-fade-in">
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/Blogs" onClick={toggleMenu}>Blogs</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/components/About" onClick={toggleMenu}>About</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/" onClick={toggleMenu}>Skills</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/projects" onClick={toggleMenu}>Projects</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/ContactUs" onClick={toggleMenu}>ContactUs</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
