"use client"
import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import BreadcrumbNavigation from '../components/Dashboard/BreadcrumbNavigation';
import AnalyticalArea from '../components/Dashboard/AnalyticalArea';
const breadcrumbLinks = [
  { label: 'Dashboard', href: '/dashboard' },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className=" flex">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-grow bg-[#1e1e1e] transition-all duration-300">
        <Navbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={'Admin'}
          logoutUrl={'/signin'}
          url={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} // Add your URL here
        />

        <div className="w-full bg-[#261e35] text-white flex gap-2 items-center h-10 border-b border-[#5c5a5acb]">
          <BreadcrumbNavigation currentPage="Home" breadcrumbLinks={breadcrumbLinks} />
        </div>
        <AnalyticalArea />
      </div>
    </div>
  );
}

export default Dashboard;