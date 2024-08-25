import React from 'react';
import AgentTable from './AgentTable';

interface Employee {
  id: number;
  name: string;
  contactNumber: string;
  email: string;
  username: string;
  password: string;
}

const Accesscontroller: React.FC = () => {
  const handleEdit = (employee: Employee) => {
    // Implement edit logic
    console.log('Edit employee:', employee);
  };

  const handleRemove = (employeeId: number) => {
    // Implement remove logic
    console.log('Remove employee with ID:', employeeId);
  };

  return (
    <div className="w-full h-full bg-[#1e1e1e] overflow-y-auto p-5" style={{ height: 'calc(100vh - 6rem)' }}>
      <h1 className="text-3xl font-bold mb-8 text-white">Agents</h1>
      <div className="rounded-md border border-[#5c5a5acb] shadow overflow-hidden">
             {/* @ts-ignore */}
        <AgentTable employees={[]} onRemove={handleRemove} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Accesscontroller;
