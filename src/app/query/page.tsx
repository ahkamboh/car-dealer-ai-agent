"use client";
import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import BreadcrumbNavigation from "../components/Dashboard/BreadcrumbNavigation";
 {/* @ts-ignore */}
import QueriesForm, { QueryData } from "../components/Dashboard/QueriesForm";
import QueriesTable from "../components/Dashboard/QueriesTable";

const breadcrumbLinks = [{ label: "Query", href: "/query" }];

function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [queryData, setQueryData] = useState<QueryData[]>([]);
  const [editQuery, setEditQuery] = useState<QueryData | null>(null); // State to hold the query being edited

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddQuery = (newQuery: QueryData) => {
    if (editQuery) {
      // Update the existing query in the state
      setQueryData(prevData =>
        prevData.map(query => (query.queryId === newQuery.queryId ? newQuery : query))
      );
      setEditQuery(null); // Clear the edit state
    } else {
      // Add the new query to the state
      setQueryData(prevData => [...prevData, newQuery]);
    }
    setIsFormVisible(false);
  };

  const handleEditQuery = (query: QueryData) => {
    setEditQuery(query); // Set the query to be edited
    setIsFormVisible(true); // Show the form with the query data
  };

  const handleCancel = () => {
    setEditQuery(null); // Clear the edit state if canceled
    setIsFormVisible(false);
  };

  return (
    <div className="flex relative">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-grow bg-[#261e35] transition-all duration-300">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} userRole={"admin"} logoutUrl={"/signin"} url={""} />
        <div className="w-full bg-[#261e35] text-white flex gap-2 items-center h-10 border-b border-[#5c5a5acb]">
          <BreadcrumbNavigation currentPage="Home" breadcrumbLinks={breadcrumbLinks} />
          <button
            onClick={() => setIsFormVisible(true)}
            className="ml-auto text-white transition-colors duration-300 hover:text-[#0D99FF] p-2 mr-2 rounded-md"
          >
            + Add Query
          </button>
        </div>
        <div className="w-full h-full bg-[#261e35] overflow-y-auto p-5" style={{ height: 'calc(100vh - 6rem)' }}>
               {/* @ts-ignore */}
     
          {isFormVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                   {/* @ts-ignore */}
                <QueriesForm onSubmit={handleAddQuery} onCancel={handleCancel} initialData={editQuery} />
            </div>
          )}
               {/* @ts-ignore */}
          <QueriesTable data={queryData} setData={setQueryData} onEditQuery={handleEditQuery} />
        </div>
      </div>
    </div>
  );
}

export default Page;
