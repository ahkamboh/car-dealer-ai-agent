"use client";
import BreadcrumbNavigation from "@/app/components/Dashboard/BreadcrumbNavigation";
import Navbar from "@/app/components/Dashboard/Navbar";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import React, { useEffect, useState } from "react";

// Define the BreadcrumbLink type
interface BreadcrumbLink {
  name: string;
  href: string;
  label: string;
}

// Define the CustomerData interface
interface CustomerData {
  ProfilePicture: string;
  Name: string;
  Email: string;
  Password: string;
  City: string;
  VisitOutcome: string;
  Purpose: string;
  CallOutcome: string;
  SentimentScore: { Neutral: number; Negative: number; Mixed: number; Positive: number }; // Updated to an object type
  Transcript: string;
  Feedback: string;
  Notes: string;
  CustomerID: string;
}

const AllCustomers: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`/api/customer/readAll`); // Assume you have an endpoint to get all customers
        if (response.ok) {
          const result = await response.json();
          setCustomers(result.data); // Assuming your API returns data in this format
        } else {
          console.error("Failed to fetch customer data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchCustomers();
  }, []);

  const renderSentimentScore = (score: { Neutral: number; Negative: number; Mixed: number; Positive: number }) => {
    return (
      <ul>
        <li>Neutral: {score.Neutral}</li>
        <li>Negative: {score.Negative}</li>
        <li>Mixed: {score.Mixed}</li>
        <li>Positive: {score.Positive}</li>
      </ul>
    );
  };

  const breadcrumbLinks: BreadcrumbLink[] = [
    { name: "", href: "/allcustomer", label: "All Customers" },
  ];

  return (
    <div className="flex relative">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-grow bg-[#261e35] transition-all duration-300">
        <Navbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={"admin"}
          logoutUrl={"/signin"}
          url={""}
        />
        <div className="w-full bg-[#261e35] text-white flex gap-2 items-center h-10 border-b border-[#5c5a5acb]">
          <BreadcrumbNavigation currentPage="Home" breadcrumbLinks={breadcrumbLinks} />
        </div>
        <div className="w-full h-full bg-[#261e35] overflow-y-auto p-5" style={{ height: "calc(100vh - 6rem)" }}>
          <h1 className="text-4xl font-bold mb-4">All Customers</h1>
     
            <div className="grid gap-3">
              {customers.map((customer) => (
                <div key={customer.CustomerID} className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-3xl text-white relative overflow-hidden shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="relative z-10 max-w-[50%] p-5">
                      {customer.ProfilePicture ? (
                        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white mb-4">
                          <img
                            src={customer.ProfilePicture}
                            alt={customer.Name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 mb-4">
                          No Image
                        </div>
                      )}
                      <h1 className="text-4xl font-bold mb-4 ClashDisplay-Bold">{customer.Name}</h1>
                      <p className="mb-6 poppins-light">
                        Email: {customer.Email}
                        <br />
                        Password: {customer.Password}
                        <br />
                        City: {customer.City}
                        <br />
                        Visit Outcome: {customer.VisitOutcome}
                        <br />
                        Purpose: {customer.Purpose}
                        <br />
                        Call Outcome: {customer.CallOutcome}
                        <br />
                        Sentiment Score: {renderSentimentScore(customer.SentimentScore)}
                      </p>
                    </div>

                    <div className="relative z-10 w-1/2 h-[300px] flex flex-col items-center justify-center">
                      {/* Placeholder Image */}
                      <img src="/card.svg" alt="Card" className="w-full object-contain" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default AllCustomers;
