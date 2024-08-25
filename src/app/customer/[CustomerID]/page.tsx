// app/customer/[CustomerID]/page.tsx
"use client"
import { useParams } from 'next/navigation'; // Use useParams for dynamic segments
import React, { useEffect, useState } from 'react';

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
  const params = useParams(); // Use useParams to get route params
  const { CustomerID } = params;
  const [customer, setCustomer] = useState<CustomerData | null>(null);

  useEffect(() => {
    if (CustomerID) {
      const fetchCustomer = async () => {
        try {
          const response = await fetch(`/api/customer/read?CustomerID=${CustomerID}`);
          if (response.ok) {
            const result = await response.json();
            setCustomer(result); // Set the fetched customer data to state
          } else {
            console.error('Failed to fetch customer details:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching customer details:', error);
        }
      };

      fetchCustomer();
    }
  }, [CustomerID]);

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <div className="flex flex-col items-center">
        {customer.ProfilePicture && (
          <img
            src={customer.ProfilePicture}
            alt={customer.Name}
            className="w-32 h-32 rounded-full mb-4"
          />
        )}
        <p><strong>Name:</strong> {customer.Name}</p>
        <p><strong>Email:</strong> {customer.Email}</p>
        <p><strong>Password:</strong> {customer.Password}</p>
        <p><strong>City:</strong> {customer.City}</p>
        <p><strong>Visit Outcome:</strong> {customer.VisitOutcome}</p>
        <p><strong>Purpose:</strong> {customer.Purpose}</p>
        <p><strong>Call Outcome:</strong> {customer.CallOutcome}</p>
        <p><strong>Sentiment Score:</strong> {customer.SentimentScore}</p>
        <p><strong>Transcript:</strong> {customer.Transcript}</p>
        <p><strong>Feedback:</strong> {customer.Feedback}</p>
        <p><strong>Notes:</strong> {customer.Notes}</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
