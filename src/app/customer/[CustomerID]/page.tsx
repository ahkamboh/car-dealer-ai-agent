"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CustomerData {
  ProfilePicture: string;
  Name: string;
  Email: string;
  Password: string;
  City: string;
  VisitOutcome: string;
  Purpose: string;
  CallOutcome: string;
  SentimentScore: number;
  Transcript: string;
  Feedback: string;
  Notes: string;
  CustomerID: string;
}

const CustomerDetails: React.FC = () => {
  const params = useParams();
  const { CustomerID } = params;
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [feedback, setFeedback] = useState(""); // New state for feedback
  const [sentimentResult, setSentimentResult] = useState<string | null>(null); // New state for sentiment result

  useEffect(() => {
    if (CustomerID) {
      const fetchCustomer = async () => {
        try {
          const response = await fetch(
            `/api/customer/read?CustomerID=${CustomerID}`
          );
          if (response.ok) {
            const result = await response.json();
            setCustomer(result);
          } else {
            console.error(
              "Failed to fetch customer details:",
              response.statusText
            );
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
      // Update the customer with the feedback
      const updateResponse = await fetch(
        `/api/customer/update?CustomerID=${CustomerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Feedback: feedback,
          }),
        }
      );

      if (!updateResponse.ok) {
        console.error(
          "Failed to update customer feedback:",
          updateResponse.statusText
        );
        return;
      }

      // Perform sentiment analysis on the updated feedback
      const PK = `CUSTOMER#${CustomerID}`;
      const SK = `PROFILE#${CustomerID}`;

      const sentimentResponse = await fetch(
        `/api/sentimentAnalysis?PK=${encodeURIComponent(
          PK
        )}&SK=${encodeURIComponent(SK)}`,
        {
          method: "GET",
        }
      );

      if (sentimentResponse.ok) {
        const result = await sentimentResponse.json();

        // Save the sentiment as SentimentScore
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
          console.error(
            "Failed to save sentiment score:",
            saveSentimentResponse.statusText
          );
          return;
        }

        setSentimentResult(result.sentiment);
      } else {
        console.error(
          "Failed to perform sentiment analysis:",
          sentimentResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error performing sentiment analysis:", error);
    }
  };

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-black shadow-md rounded-md mt-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <div className="flex flex-col items-center">
        {customer.ProfilePicture && (
          <img
            src={customer.ProfilePicture}
            alt={customer.Name}
            className="w-32 h-32 rounded-full mb-4"
          />
        )}
        <p>
          <strong>Name:</strong> {customer.Name}
        </p>
        <p>
          <strong>Email:</strong> {customer.Email}
        </p>
        <p>
          <strong>Password:</strong> {customer.Password}
        </p>
        <p>
          <strong>City:</strong> {customer.City}
        </p>
        <p>
          <strong>Visit Outcome:</strong> {customer.VisitOutcome}
        </p>
        <p>
          <strong>Purpose:</strong> {customer.Purpose}
        </p>
        <p>
          <strong>Call Outcome:</strong> {customer.CallOutcome}
        </p>
        <p>
          <strong>Sentiment Score:</strong> {customer.SentimentScore}
        </p>
        <p>
          <strong>Transcript:</strong> {customer.Transcript}
        </p>
        <p>
          <strong>Feedback:</strong> {customer.Feedback}
        </p>
        <p>
          <strong>Notes:</strong> {customer.Notes}
        </p>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-xl font-semibold mb-2">Submit Feedback</h2>
        <form
          onSubmit={handleFeedbackSubmit}
          className="flex flex-col items-center"
        >
          <textarea
            className="w-full p-2 border rounded-md mb-4 text-black"
            rows={4}
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-[#b783eb] to-[#e81a9d] hover:bg-gradient-to-tr font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Submit Feedback
          </button>
        </form>

        {sentimentResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md w-full">
            <h3 className="text-lg font-semibold">
              Sentiment Analysis Result:
            </h3>
            <p className="mt-2 text-sm text-gray-700">{sentimentResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
