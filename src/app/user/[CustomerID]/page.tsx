"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface CustomerData {
  ProfilePicture?: string;
  Email: string;
  Feedback?: string;
  Password: string;
  CustomerID: string;
  SentimentScore?: { Neutral: number; Negative: number; Mixed: number; Positive: number };
}

const EditProfilePage: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
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
        setValue("ProfilePicture", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data: CustomerData) => {
    if (!customerData) {
      toast.error("Customer data not loaded.");
      return;
    }

    setIsLoading(true); // Set loading to true when starting the form submission

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
        setIsLoading(false); // Set loading to false when an error occurs
        return;
      }

      // Step 2: Call the sentiment analysis endpoint
      const sentimentResponse = await fetch(
        `/api/sentimentAnalysis?PK=${encodeURIComponent(`CUSTOMER#${CustomerID}`)}&SK=${encodeURIComponent(`PROFILE#${CustomerID}`)}`
      );

      if (!sentimentResponse.ok) {
        const errorText = await sentimentResponse.text();
        toast.error(`Failed to perform sentiment analysis: ${errorText}`);
        setIsLoading(false); // Set loading to false when an error occurs
        return;
      }

      const sentimentData = await sentimentResponse.json();
      const sentimentScore = sentimentData.sentimentScore;

      // Step 3: Update DynamoDB with the sentiment score
      const updateSentimentResponse = await fetch(`/api/customer/update?CustomerID=${CustomerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SentimentScore: sentimentScore,
        }),
      });

      if (!updateSentimentResponse.ok) {
        toast.error("Failed to update sentiment score.");
        setIsLoading(false); // Set loading to false when an error occurs
        return;
      }

      toast.success("Profile, feedback, and sentiment score updated successfully!");
      setIsSubmitted(true);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after submission is complete
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-pink-600 flex flex-col justify-center items-center p-4">
      <ToastContainer />
      {isSubmitted ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-green-500 text-2xl text-center">
            Thank you for updating your profile and feedback!
          </div>
        </div>
      ) : (
        <>
          <h1 className="ClashDisplay-Bold text-3xl text-white leading-5 py-5 text-center">
            Cortex profile and give feedback!
          </h1>
          <div className="bg-glass-feed rounded-lg w-full max-w-6xl text-white relative overflow-hidden p-4 sm:p-8">
            <div className="flex flex-col lg:flex-row justify-between w-full space-y-8 lg:space-y-0 lg:space-x-8">
              <div className="relative z-10 flex-1 p-5">
                <FormProvider {...formMethods}>
                  <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 w-full">
                    <div>
                      <label htmlFor="Email">Email</label>
                      <Input
                        type="email"
                        id="Email"
                        {...register("Email")}
                        className="mb-6 bg-[#d7d7d7b8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="ProfilePicture">Profile Picture</label>
                      <Input
                        type="file"
                        id="ProfilePicture"
                        onChange={handleImageChange}
                        className="rounded-md outline-none p-2 pt-1.5 text-black border border-white w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="Feedback">Feedback</label>
                      <textarea
                        required
                        id="Feedback"
                        {...register("Feedback")}
                        className="w-full text-black p-2 rounded-md resize-none border border-white bg-transparent outline-none"
                        rows={6}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update"}
                    </button>
                  </form>
                </FormProvider>
              </div>

              <div className="relative sm:flex hidden w-full lg:w-1/2  items-center justify-center">
                <img src="/card.svg" alt="Card" className="w-full  h-auto" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w-full text-center mt-16">
            <Link href="https://www.linkedin.com/in/ahkamboh/" target="_blank" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="https://www.linkedin.com/in/ahkamboh/" target="_blank" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="https://www.linkedin.com/in/ahkamboh/" target="_blank" className="text-sm text-gray-400 hover:text-white">
              Contact Us
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProfilePage;
