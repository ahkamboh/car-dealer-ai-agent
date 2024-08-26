"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomerData {
  ProfilePicture?: string;
  Email: string;
  Feedback?: string;
  Password: string;
  CustomerID: string;
}

const EditProfilePage: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams();
  const CustomerID = Array.isArray(params.CustomerID) ? params.CustomerID[0] : params.CustomerID;

  const formMethods = useForm<CustomerData>({
    defaultValues: customerData || {},
  });
  const { handleSubmit, register, reset, setValue } = formMethods;

  useEffect(() => {
    if (CustomerID) {
      const fetchCustomerData = async () => {
        try {
          const response = await fetch(`/api/customer/read?CustomerID=${CustomerID}`);
          if (response.ok) {
            const data = await response.json();
            setCustomerData(data);
            reset(data);
          } else {
            const errorText = await response.text();
            toast.error(`Failed to fetch customer data: ${errorText}`);
          }
        } catch (error: any) {
          toast.error(`Error fetching customer data: ${error.message}`);
        }
      };

      fetchCustomerData();
    }
  }, [CustomerID, reset]);

  // Handle image file selection and convert it to Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("ProfilePicture", reader.result as string); // Convert image to Base64 and set it in the form
      };
      reader.readAsDataURL(file); // Convert image file to Base64
    }
  };

  const handleFormSubmit = async (data: CustomerData) => {
    if (!customerData) {
      toast.error("Customer data not loaded.");
      return;
    }

    try {
      // Step 1: Update the profile and feedback
      const response = await fetch(`/api/customer/update?CustomerID=${CustomerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProfilePicture: data.ProfilePicture,
          Feedback: data.Feedback,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update profile and feedback.");
        return;
      }

      // Step 2: Call the sentiment analysis endpoint
      const sentimentResponse = await fetch(
        `/api/sentimentAnalysis?PK=CUSTOMER%23${encodeURIComponent(CustomerID)}&SK=PROFILE%23${encodeURIComponent(CustomerID)}`
      );

      if (!sentimentResponse.ok) {
        toast.error("Failed to perform sentiment analysis.");
        return;
      }

      const sentimentData = await sentimentResponse.json();

      // Step 3: Update DynamoDB with the sentiment score
      const updateSentimentResponse = await fetch(`/api/customer/update?CustomerID=${CustomerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SentimentScore: sentimentData.sentimentScore,
        }),
      });

      if (!updateSentimentResponse.ok) {
        toast.error("Failed to update sentiment score.");
        return;
      }

      toast.success("Profile, feedback, and sentiment score updated successfully!");
      setIsSubmitted(true);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Update Profile and Feedback</h1>

      {isSubmitted ? (
        <div className="text-green-500 text-center mt-4">Thank you for updating your profile and feedback!</div>
      ) : (
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                {...register("Email")}
                className="rounded-md border-gray-300"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="ProfilePicture">Profile Picture</label>
              <input
                type="file"
                id="ProfilePicture"
                onChange={handleImageChange} // Use custom handler for image change
                className="rounded-md border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="Feedback">Feedback</label>
              <textarea
                id="Feedback"
                {...register("Feedback")}
                className="w-full p-2 rounded-md border-gray-300"
                rows={4}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2">
              Update
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default EditProfilePage;
