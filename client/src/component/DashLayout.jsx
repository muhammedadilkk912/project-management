import React, { useState } from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { FaBars, FaUsers, FaXmark } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiFolderChartLine } from "react-icons/ri";



const DashLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { icon: MdOutlineDashboard, label: 'Dashboard', path: '/' },
    { icon: FaUsers, label: 'Employees', path: '/employees' },
    { icon: RiFolderChartLine, label: 'Projects', path: '/projects' },
    { icon: GoTasklist, label: 'Tasks', path: '/tasks' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed z-50 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-200
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FaXmark />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2  rounded  ${
                      isActive ? 'text-blue-500 font-medium bg-blue-50' : 'hover:bg-gray-100'
                    }`
                  }
                >
                  <link.icon className="mr-3" />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:ml-64">

        {/* Header */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
              <FaBars />
            </button>
            <h2 className="text-xl font-semibold">Admin Panel</h2>
          </div>
          <FaUsers />
        </header>

        {/* 🔥 Outlet renders child pages */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashLayout;