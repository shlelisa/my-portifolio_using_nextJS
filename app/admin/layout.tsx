// app/admin/layout.tsx
import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
  
      <main>{children}</main>
      
    </div>
  )
}
