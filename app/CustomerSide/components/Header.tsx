"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // You can install lucide-react or use any other icon
import { supabase } from "@/app/supabase/supabaseClient"; // Adjust the import path as necessary

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [logo, setLogo] = useState<{ logo: string | null }>({ logo: null });

  const fetchLogo = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("logo")
      .single();
    if (error) {
      console.error("Error fetching logo:", error);
      return null;
    }
    setLogo({ logo: data.logo });
  };

  React.useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-800">
          <Link href="/">
            <div className="flex items-center space-x-3">
              {logo.logo ? (
                <img
                  src={logo.logo}
                  alt="Logo"
                  className="h-12 w-12 object-cover rounded-full border-2 border-blue-500 shadow-md hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <span className="text-2xl font-bold text-blue-600 tracking-wide">
                  My Portfolio
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={15} /> : <Menu size={15} />}
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
        <ul className="md:hidden flex flex-col gap-2 bg-white mx-30 px-2 pb-2 text-gray-800 font-medium text-lg animate-fade-in">
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/Blogs" onClick={toggleMenu}>
              Blogs
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/components/About" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/" onClick={toggleMenu}>
              Skills
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/projects" onClick={toggleMenu}>
              Projects
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-800">
            <Link href="/CustomerSide/ContactUs" onClick={toggleMenu}>
              ContactUs
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
