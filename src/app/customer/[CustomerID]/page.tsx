"use client";
import BreadcrumbNavigation from "@/app/components/Dashboard/BreadcrumbNavigation";
import Navbar from "@/app/components/Dashboard/Navbar";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import { useParams } from "next/navigation";
  {/* @ts-ignore */}
import QueriesForm, { QueryData } from "../../components/Dashboard/QueriesForm";
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
  SentimentScore: { Neutral: number; Negative: number; Mixed: number; Positive: number } | null;
  Transcript: string;
  Feedback: string;
  Notes: string;
  CustomerID: string;
}

const CustomerDetails: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [queryData, setQueryData] = useState<QueryData[]>([]);
  const [editQuery, setEditQuery] = useState<QueryData | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddQuery = (newQuery: QueryData) => {
    if (editQuery) {
      setQueryData((prevData) =>
        prevData.map((query) => (query.queryId === newQuery.queryId ? newQuery : query))
      );
      setEditQuery(null);
    } else {
      setQueryData((prevData) => [...prevData, newQuery]);
    }
    setIsFormVisible(false);
  };

  const handleEditQuery = (query: QueryData) => {
    setEditQuery(query);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setEditQuery(null);
    setIsFormVisible(false);
  };

  const params = useParams();
  const { CustomerID } = params;
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [feedback, setFeedback] = useState("");
  const [sentimentResult, setSentimentResult] = useState<string | null>(null);

  useEffect(() => {
    if (CustomerID) {
      const fetchCustomer = async () => {
        try {
          const response = await fetch(`/api/customer/read?CustomerID=${CustomerID}`);
          if (response.ok) {
            const result = await response.json();
            setCustomer(result);
          } else {
            console.error("Failed to fetch customer details:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching customer details:", error);
        }
      };

      fetchCustomer();
    }
  }, [CustomerID]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback) {
      alert("Please enter feedback before submitting.");
      return;
    }

    if (!CustomerID) {
      console.error("CustomerID is missing.");
      return;
    }

    try {
      const updateResponse = await fetch(`/api/customer/update?CustomerID=${CustomerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Feedback: feedback,
        }),
      });

      if (!updateResponse.ok) {
        console.error("Failed to update customer feedback:", updateResponse.statusText);
        return;
      }

      const PK = `CUSTOMER#${CustomerID}`;
      const SK = `PROFILE#${CustomerID}`;

      const sentimentResponse = await fetch(
        `/api/sentimentAnalysis?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`,
        {
          method: "GET",
        }
      );

      if (sentimentResponse.ok) {
        const result = await sentimentResponse.json();

        const saveSentimentResponse = await fetch(
          `/api/customer/update?CustomerID=${CustomerID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              SentimentScore: result.sentiment,
            }),
          }
        );

        if (!saveSentimentResponse.ok) {
          console.error("Failed to save sentiment score:", saveSentimentResponse.statusText);
          return;
        }

        setSentimentResult(result.sentiment);
      } else {
        console.error("Failed to perform sentiment analysis:", sentimentResponse.statusText);
      }
    } catch (error) {
      console.error("Error performing sentiment analysis:", error);
    }
  };

  // Generate breadcrumb links dynamically
  const breadcrumbLinks: BreadcrumbLink[] = [
    { name: "", href: `/customer/${CustomerID}`, label: customer ? customer.Name : "" },
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
          <div className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-3xl text-white relative overflow-hidden ">
            <div className="flex justify-between items-center">
              <div className="relative z-10 max-w-[50%] p-5">
                <p className="text-sm uppercase mb-2"></p>
                {customer && customer.ProfilePicture ? (
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
                {customer && (
                  <>
                    <h1 className="text-4xl font-bold ClashDisplay-Bold mb-4">{customer.Name}</h1>
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
                      {customer.SentimentScore ? (
                        <>
                          Sentiment Score:
                          <ul>
                            <li>Neutral: {customer.SentimentScore.Neutral}</li>
                            <li>Negative: {customer.SentimentScore.Negative}</li>
                            <li>Mixed: {customer.SentimentScore.Mixed}</li>
                            <li>Positive: {customer.SentimentScore.Positive}</li>
                          </ul>
                        </>
                      ) : (
                        <span>Sentiment Score: N/A</span>
                      )}
                      <br />
                      Feedback: {customer.Feedback}
                    </p>
                  </>
                )}
              </div>

              <div className="relative z-10 w-1/2 h-[300px] sm:flex hidden flex-col items-center justify-center">
                <img src="/card.svg" alt="Card" className="w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
