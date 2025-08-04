// app/admin/layout.tsx
import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <nav className="bg-white shadow rounded p-4 mb-6 flex gap-6">
        <a href="/admin/blogs" className="hover:text-blue-600 font-semibold">Blogs</a>
        <a href="/admin/about" className="hover:text-blue-600 font-semibold">About</a>
        <a href="/admin/skills" className="hover:text-blue-600 font-semibold">Skills</a>
        <a href="/admin/projects" className="hover:text-blue-600 font-semibold">Projects</a>
        <a href="/admin/contact" className="hover:text-blue-600 font-semibold">Contact Us</a>
      </nav>
      <main>{children}</main>
    </div>
  )
}
