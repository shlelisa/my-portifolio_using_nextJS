'use client';
import React from 'react';
import Link from 'next/link';


const Header = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-blue-800"> <Link href="/">LOGO</Link> </div>
        <ul className="flex gap-6 text-gray-800 font-medium text-lg">
          <li className="cursor-pointer hover:text-blue-800" ><Link href="/">Home</Link></li>
          <li className="cursor-pointer hover:text-blue-800" ><Link href="/CustomerSide/components/About">About</Link></li>
          <li className="cursor-pointer hover:text-blue-800" ><Link href="/">Skills</Link></li>
          <li className="cursor-pointer hover:text-blue-800" ><Link href="/projects">Projects</Link></li>
          <li className="cursor-pointer hover:text-blue-800"><Link href="/CustomerSide/ContactUs">ContactUs</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
