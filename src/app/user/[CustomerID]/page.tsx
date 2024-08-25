"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomerData {
  ProfilePicture?: string; // URL of the profile picture
  Email: string;
  Feedback?: string;
  Password: string;
  CustomerID: string;
  SentimentScore?: {
    Neutral: number;
    Negative: number;
    Mixed: number;
    Positive: number;
  };
}

const EditProfilePage: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams();
  const CustomerID = params.CustomerID;

  const formMethods = useForm<CustomerData>({
    defaultValues: customerData || {},
  });
  const { handleSubmit, register, reset, setValue } = formMethods;

  useEffect(() => {
    if (CustomerID) {
      const fetchCustomerData = async () => {
        try {
          const response = await fetch(
            `/api/customer/read?CustomerID=${CustomerID}`
          );
          if (response.ok) {
            const data = await response.json();
            setCustomerData(data);
            reset(data);
          } else {
            const errorText = await response.text();
            toast.error(`Failed to fetch customer data: ${errorText}`);
          }
        } catch (error:any) {
          toast.error(`Error fetching customer data: ${error.message}`);
        }
      };

      fetchCustomerData();
    }
  }, [CustomerID, reset]);

  // Handle image file selection and upload to server
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload the image file to your server or a cloud storage service
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          setValue("ProfilePicture", imageUrl); // Set image URL to form value
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("An error occurred during image upload. Please try again.");
      }
    }
  };

  const handleFormSubmit = async (data: CustomerData) => {
    if (!customerData) {
      toast.error("Customer data not loaded.");
      return;
    }

    try {
      // Step 1: Update the profile and feedback
      const response = await fetch(
        `/api/customer/update?CustomerID=${CustomerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProfilePicture: data.ProfilePicture, // Now it's a URL, not base64
            Feedback: data.Feedback,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to update profile and feedback.");
        return;
      }

      // Step 2: Call the sentiment analysis endpoint
      const sentimentResponse = await fetch(
        `/api/sentimentAnalysis?PK=${encodeURIComponent(
          `CUSTOMER#${CustomerID}`
        )}&SK=${encodeURIComponent(`PROFILE#${CustomerID}`)}`
      );

      if (!sentimentResponse.ok) {
        const errorText = await sentimentResponse.text();
        toast.error(`Failed to perform sentiment analysis: ${errorText}`);
        console.error("Sentiment Analysis Error:", errorText);
        return;
      }

      const sentimentData = await sentimentResponse.json();

      // Step 3: Update DynamoDB with the sentiment score
      const updateSentimentResponse = await fetch(
        `/api/customer/update?CustomerID=${CustomerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SentimentScore: sentimentData.sentimentScore,
          }),
        }
      );

      if (!updateSentimentResponse.ok) {
        toast.error("Failed to update sentiment score.");
        return;
      }

      toast.success(
        "Profile, feedback, and sentiment score updated successfully!"
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Update Profile and Feedback</h1>

      {isSubmitted ? (
        <div className="text-green-500 text-center mt-4">
          Thank you for updating your profile and feedback!
        </div>
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
            {/* Render sentiment scores if available */}
            {customerData?.SentimentScore && (
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Sentiment Scores
                </h2>
                <ul>
                  <li>Neutral: {customerData.SentimentScore.Neutral}</li>
                  <li>Negative: {customerData.SentimentScore.Negative}</li>
                  <li>Mixed: {customerData.SentimentScore.Mixed}</li>
                  <li>Positive: {customerData.SentimentScore.Positive}</li>
                </ul>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
            >
              Update
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default EditProfilePage;
