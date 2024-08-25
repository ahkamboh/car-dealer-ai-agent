import React from "react";

interface Employee {
  id: number;
  name: string;
  contactNumber: string;
  email: string;
  username: string;
  password: string;
  isActive: string;
}

interface AgentTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onToggleActive: (employeeId: number) => void;
}

const AgentTable: React.FC<AgentTableProps> = ({
  employees,
  onEdit,
  onToggleActive,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#242424] text-white">
        <thead>
          <tr className="w-full border-b border-[#5c5a5acb]">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Contact Number</th>
            <th className="px-6 py-3 text-left">Email Address</th>
            <th className="px-6 py-3 text-left">Username</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="w-full border-b border-[#5c5a5acb]">
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4">{employee.contactNumber}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.username}</td>
              <td className="px-6 py-4">{employee.isActive}</td>
              <td className="px-6 py-4">
                <button
                  className="px-4 py-2 text-[#0D99FF] hover:bg-[#5c5a5acb] transition-colors duration-200  border border-[#5c5a5acb] rounded mr-2"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className={`px-4 py-2 ${
                    employee.isActive === "active"
                      ? "text-red-600"
                      : "text-green-500"
                  } hover:bg-[#5c5a5acb] transition-colors duration-200  border border-[#5c5a5acb]  rounded`}
                  onClick={() => onToggleActive(employee.id)}
                >
                  {employee.isActive === "active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentTable;
