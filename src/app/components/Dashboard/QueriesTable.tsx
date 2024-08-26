import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

export interface CustomerData {
  CallOutcome: ReactNode;
  ProfilePicture: string;
  Name: string;
  Email: string;
  Password: string;
  City: string;
  VisitOutcome: string;
  Purpose: string;
  CustomerID: string;
}

interface QueriesTableProps {
  data: CustomerData[];
  setData: (data: CustomerData[]) => void;
}

const QueriesTable: React.FC<QueriesTableProps> = ({ data, setData }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customer/readAll');
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setData]);

  const handleDelete = async (customerID: string) => {
    if (!confirm('Are you sure you want to delete this customer profile and all associated data?')) {
      return;
    }

    try {
      const response = await fetch(`/api/customer/delete?CustomerID=${customerID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter((item) => item.CustomerID !== customerID));
        alert('Customer profile and all associated data deleted successfully');
      } else {
        console.error('Failed to delete customer profile:', await response.text());
        alert('Failed to delete customer profile');
      }
    } catch (error) {
      console.error('Error deleting customer profile:', error);
      alert('Error deleting customer profile');
    }
  };

  const handleMoreDetails = (customerID: string) => {
    router.push(`/customer/${customerID}`);
  };

  const handleSendEmail = async (customerID: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: customerID, email, password }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        console.error('Failed to send email:', await response.text());
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-white">Customer Data</h1>
      <div className="overflow-x-auto hidden xl:block border rounded-md border-[#5c5a5acb]">
        <table className="min-w-full bg-[#261e35] text-white">
          <thead className="bg-[#5c5a5a3f]">
            <tr>
              <th className="text-center py-3 px-1.5">Profile Picture</th>
              <th className="text-center py-3 px-1.5">Name</th>
              <th className="text-center py-3 px-1.5">Email</th>
              <th className="text-center py-3 px-1.5">Password</th>
              <th className="text-center py-3 px-1.5">City</th>
              <th className="text-center py-3 px-1.5">Visit Outcome</th>
              <th className="text-center py-3 px-1.5">Call Outcome</th>
              <th className="text-center py-3 px-1.5">Purpose</th>
              <th className="text-center py-3 px-1.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.CustomerID} className="border-b border-[#5c5a5acb]">
                <td className="text-center py-3 px-1.5">
                  <img src={item.ProfilePicture} alt={item.Name} className="w-10 h-10 rounded-full mx-auto" />
                </td>
                <td className="text-center py-3 px-1.5">{item.Name}</td>
                <td className="text-center py-3 px-1.5">{item.Email}</td>
                <td className="text-center py-3 px-1.5">●●●●●●●●●●●●</td>
                <td className="text-center py-3 px-1.5">{item.City}</td>
                <td className="text-center py-3 px-1.5">{item.VisitOutcome}</td>
                <td className="text-center py-3 px-1.5">{item.CallOutcome}</td>
                <td className="text-center py-3 px-1.5">{item.Purpose}</td>
                <td className="text-center py-3 px-1.5 flex gap-2 justify-center">
                  <button
                    className="px-3 py-2 text-[#0D99FF] hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded"
                    onClick={() => handleMoreDetails(item.CustomerID)}
                  >
                    More Details
                  </button>
                  <button
                    className="px-3 py-2 text-red-500 hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded"
                    onClick={() => handleDelete(item.CustomerID)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-2 text-green-500 hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded"
                    onClick={() => handleSendEmail(item.CustomerID, item.Email, item.Password)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="xl:hidden grid gap-4">
        {data.map((item) => (
          <div key={item.CustomerID} className="bg-[#261e35] p-4 border border-[#5c5a5acb] rounded-md text-white">
            <div className="grid gap-2">
              <div className="text-center">
                <img src={item.ProfilePicture} alt={item.Name} className="w-10 h-10 rounded-full mx-auto" />
              </div>
              <div><strong>Name:</strong> {item.Name}</div>
              <div><strong>Email:</strong> {item.Email}</div>
              <div><strong>Password:</strong> {item.Password}</div>
              <div><strong>City:</strong> {item.City}</div>
              <div><strong>Visit Outcome:</strong> {item.VisitOutcome}</div>
              <div><strong>Call Outcome:</strong> {item.CallOutcome}</div>
              <div><strong>Purpose:</strong> {item.Purpose}</div>
              <div className="sm:flex-row flex  flex-col gap-2 justify-center">
                <button
                  className="px-3 py-2 text-[#0D99FF] hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded w-full"
                  onClick={() => handleMoreDetails(item.CustomerID)}
                >
                  More Details
                </button>
                <button
                  className="px-3 py-2 text-red-500 hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded w-full"
                  onClick={() => handleDelete(item.CustomerID)}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-2 text-green-500 hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded w-full"
                  onClick={() => handleSendEmail(item.CustomerID, item.Email, item.Password)}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueriesTable;
