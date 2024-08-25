import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Employee {
  id: number;
  name: string;
  contactNumber: string;
  email: string;
  username: string;
  password: string;
  isActive: string;
}

interface AddAgentProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
  initialData?: Employee | null;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const AddAgent: React.FC<AddAgentProps> = ({
  isOpen,
  onClose,
  onAdd,
  initialData,
  employees,
  setEmployees,
}) => {
  const [formData, setFormData] = useState<Employee>({
    id: 0, // Default ID when adding a new employee
    name: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    isActive: "active", // Default value for isActive
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: employees.length ? Math.max(...employees.map((emp) => emp.id)) + 1 : 1, // Generate a new ID
        name: "",
        contactNumber: "",
        email: "",
        username: "",
        password: "",
        isActive: "active",
      });
    }
  }, [initialData, employees]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the field that the user is typing in
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    // Only check for duplicate username if username is provided
    if (formData.username && employees.some(
        (emp) => emp.username === formData.username && emp.id !== formData.id
      )
    ) {
      newErrors.username = "Username already exists";
    }

    // Only check for duplicate email if email is provided
    if (formData.email && employees.some(
        (emp) => emp.email === formData.email && emp.id !== formData.id
      )
    ) {
      newErrors.email = "Email already exists";
    }

    return newErrors;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    // Add or update the employee in the state
    if (initialData) {
      // Update existing employee
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === formData.id ? formData : emp
        )
      );
      toast.success("Employee updated successfully!");
    } else {
      // Add new employee
      setEmployees((prevEmployees) => [...prevEmployees, formData]);
      toast.success("Employee added successfully!");
    }

    onAdd(formData);
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-[#1e1e1e] border border-[#5c5a5acb] rounded-md p-5 w-1/3">
        <h2 className="text-xl font-bold text-white mb-4">
          {initialData ? "Update Agent" : "Create Agent"}
        </h2>
        <form onSubmit={handleAdd} className="text-white ">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              className="w-full p-2 mb-1 bg-[#5c5a5a6f] border rounded-md border-[#5c5a5acb]"
              placeholder="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-4">{errors.name}</p>
            )}
            
            <label className="block text-sm font-medium mb-1" htmlFor="contactNumber">Contact Number</label>
            <input
              className="w-full p-2 mb-1 bg-[#5c5a5a6f] border rounded-md border-[#5c5a5acb]"
              placeholder="Contact Number"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <p className="text-red-500 text-sm mb-4">{errors.contactNumber}</p>

            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              className="w-full p-2 mb-1 bg-[#5c5a5a6f] border rounded-md border-[#5c5a5acb]"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-4">{errors.email}</p>
            )}

            <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
            <input
              className="w-full p-2 mb-1 bg-[#5c5a5a6f] border rounded-md border-[#5c5a5acb]"
              placeholder="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mb-4">{errors.username}</p>
            )}

            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              className="w-full p-2 mb-1 bg-[#5c5a5a6f] border rounded-md border-[#5c5a5acb]"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-4">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-between gap-3">
            <button
              type="submit" 
              className="px-4 py-2 hover:bg-[#0D99FF] bg-[#0d9affb1] transition-colors duration-200 w-full text-white rounded-md"
            >
              {initialData ? "Update Employee" : "Add Agent"}
            </button>
            <button
              type="button"
              className="mr-2 px-4 py-2 hover:bg-[#5c5a5acb] bg-[#5c5a5a6f] transition-colors duration-200 border border-[#5c5a5acb] text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
