import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the data structure based on your schema requirements
export interface CustomerData {
  ProfilePicture?: string; // Optional field
  Name: string; // Required field
  Email: string; // Required field
  Password: string; // Required field
  City?: string; // Optional field
  VisitOutcome?: string; // Optional field
  Purpose?: string; // Optional field
  CallOutcome?: string; // Optional field
  SentimentScore: number; // New field included with default value
  Transcript: string; // New field included with default empty value
  Feedback: string; // New field included with default empty value
  Notes: string; // New field included with default empty value
}

// Define the structure for error handling
interface FormErrors {
  Name?: string;
  Email?: string;
  Password?: string;
}

interface FormProps {
  onSubmit: (data: CustomerData) => void;
  onCancel: () => void;
  initialData?: CustomerData;
}

const CustomerForm: React.FC<FormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<CustomerData>({
    ProfilePicture: '', // Initialize as an empty string for optional field
    Name: '',
    Email: '',
    Password: '',
    City: '', // Optional field
    VisitOutcome: '', // Optional field
    Purpose: '', // Optional field
    CallOutcome: '', // Default empty value for optional field
    SentimentScore: 0.0, // Initialize as 0.0, representing neutral sentiment
    Transcript: '', // Initialize as an empty string
    Feedback: '', // Initialize as an empty string
    Notes: '', // Initialize as an empty string
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [existingEmails, setExistingEmails] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        CallOutcome: initialData.CallOutcome || '', // Default to empty string if not provided
        SentimentScore: initialData.SentimentScore || 0.0, // Initialize as 0.0
        Transcript: initialData.Transcript || '', // Initialize as an empty string
        Feedback: initialData.Feedback || '', // Initialize as an empty string
        Notes: initialData.Notes || '', // Initialize as an empty string
      });
    }
  }, [initialData]);

  useEffect(() => {
    // Fetch existing customer emails from the backend to check for duplicates
    const fetchExistingEmails = async () => {
      try {
        const response = await fetch('/api/customer/readAll');
        if (response.ok) {
          const result = await response.json();
          const emails = result.data.map((customer: CustomerData) => customer.Email);
          setExistingEmails(emails);
        } else {
          console.error('Failed to fetch existing emails:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching existing emails:', error);
      }
    };

    fetchExistingEmails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     {/* @ts-ignore */}
    const { name, value, type, files } = e.target;

    if (type === 'file' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          ProfilePicture: reader.result as string, // Convert to base64 string
        }));
      };

      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Check if email already exists
      if (name === 'Email' && existingEmails.includes(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Email: 'This email is already in use.',
        }));
      } else if (name === 'Email') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Email: '', // Clear error if email is unique
        }));
      }
    }

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.Name) newErrors.Name = 'Name is required';
    if (!formData.Email) newErrors.Email = 'Email is required';
    if (existingEmails.includes(formData.Email)) newErrors.Email = 'This email is already in use';
    if (!formData.Password) newErrors.Password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill out all required fields');
      return;
    }

    try {
      const response = await fetch('/api/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Customer created successfully!');
        onSubmit(formData);
      } else {
        toast.error('Failed to create customer');
      }
    } catch (error) {
      console.error('An error occurred while creating the customer:', error);
      toast.error('An error occurred while creating the customer');
    }
  };

  return (
    <div className='max-w-2xl p-4 space-y-4 w-full text-white sm:scale-100 scale-75 bg-[#342d3e] border rounded-md border-[#5c5a5acb]'>
      <ToastContainer />
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className="grid sm:grid-cols-2 gap-4 ">
          <div>
            <label htmlFor="ProfilePicture" className="block text-white">
              Profile Picture (optional)
            </label>
            <input
              type="file"
              id="ProfilePicture"
              name="ProfilePicture"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb]"
            />
          </div>
          <div>
            <label htmlFor="Name" className="block text-white">
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className={`w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb] ${
                errors.Name ? 'border-red-500' : ''
              }`}
            />
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
          </div>
          <div>
            <label htmlFor="Email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className={`w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb] ${
                errors.Email ? 'border-red-500' : ''
              }`}
            />
            {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
          </div>
          <div>
            <label htmlFor="Password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className={`w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb] ${
                errors.Password ? 'border-red-500' : ''
              }`}
            />
            {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
          </div>
          <div>
            <label htmlFor="City" className="block text-white">
              City (optional)
            </label>
            <input
              type="text"
              id="City"
              name="City"
              value={formData.City}
              onChange={handleChange}
              className="w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb]"
            />
          </div>
          <div>
            <label htmlFor="VisitOutcome" className="block text-white">
              Visit Outcome (optional)
            </label>
            <input
              type="text"
              id="VisitOutcome"
              name="VisitOutcome"
              value={formData.VisitOutcome}
              onChange={handleChange}
              className="w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb]"
            />
          </div>
          <div>
            <label htmlFor="Purpose" className="block text-white">
              Purpose (optional)
            </label>
            <input
              type="text"
              id="Purpose"
              name="Purpose"
              value={formData.Purpose}
              onChange={handleChange}
              className="w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb]"
            />
          </div>
          <div>
            <label htmlFor="CallOutcome" className="block text-white">
              Call Outcome (optional)
            </label>
            <input
              type="text"
              id="CallOutcome"
              name="CallOutcome"
              value={formData.CallOutcome}
              onChange={handleChange}
              className="w-full p-2 bg-[#342d3e] border rounded-md border-[#5c5a5acb]"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-br from-purple-700 to-pink-600  hover:bg-gradient-to-tr transition-colors duration-200 w-full text-white rounded-md"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 hover:bg-[#6f4e9d] bg-[#342d3e] transition-colors duration-200 border border-[#5c5a5acb] text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
