import React, { useEffect } from 'react';

export interface CustomerData {
  ProfilePicture: string;
  Name: string;
  Email: string;
  Password: string;
  City: string;
  VisitOutcome: string;
  Purpose: string;
  CustomerID: string;  // Ensure we are using CustomerID to uniquely identify customers
}

interface QueriesTableProps {
  data: CustomerData[];
  setData: (data: CustomerData[]) => void; // A function to update the data in the parent component
  onEditQuery: (query: CustomerData) => void; // Function to trigger the edit mode
}

const QueriesTable: React.FC<QueriesTableProps> = ({ data, setData, onEditQuery }) => {
  useEffect(() => {
    // Fetch initial data from the new endpoint when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customer/readAll'); // Adjust the API endpoint
        if (response.ok) {
          const result = await response.json();
          setData(result.data); // Populate the table with initial data from the new endpoint
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
        // Remove the deleted customer from the state
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

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-white">Customer Data</h1>
      <div className="overflow-x-auto hidden lg:block border rounded-md border-[#5c5a5acb]">
        <table className="min-w-full bg-[#261e35]] text-white">
          <thead className="bg-[#5c5a5a3f]">
            <tr>
              <th className="text-center py-3 px-1.5">Profile Picture</th>
              <th className="text-center py-3 px-1.5">Name</th>
              <th className="text-center py-3 px-1.5">Email</th>
              <th className="text-center py-3 px-1.5">Password</th>
              <th className="text-center py-3 px-1.5">City</th>
              <th className="text-center py-3 px-1.5">Visit Outcome</th>
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
                <td className="text-center py-3 px-1.5">{item.Password}</td>
                <td className="text-center py-3 px-1.5">{item.City}</td>
                <td className="text-center py-3 px-1.5">{item.VisitOutcome}</td>
                <td className="text-center py-3 px-1.5">{item.Purpose}</td>
                <td className="text-center py-3 px-1.5 flex gap-2 justify-center">
                  <button
                    className="px-3 py-2 text-[#0D99FF] hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded"
                    onClick={() => onEditQuery(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-2 text-red-500 hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded"
                    onClick={() => handleDelete(item.CustomerID)}
                  >
                    Delete
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
              <td className="text-center py-3 px-1.5">{item.VisitOutcome}</td>
              <td className="text-center py-3 px-1.5">{item.Purpose}</td>
              <div className="flex gap-2 justify-center">
                <button
                  className="px-3 py-2 text-[#0D99FF] hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded w-full"
                  onClick={() => onEditQuery(item)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-2 text-red-500 hover:bg-[#5c5a5acb] transition-colors duration-200 border border-[#5c5a5acb] rounded w-full"
                  onClick={() => handleDelete(item.CustomerID)}
                >
                  Delete
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
