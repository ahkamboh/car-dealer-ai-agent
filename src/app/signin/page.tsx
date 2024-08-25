"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomerData {
  CustomerID: string;
  Email: string;
  Password: string;
}

function Signin() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;
  const router = useRouter();

  useEffect(() => {
    // Fetch customer data on mount
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("/api/customer/readAll");
        if (response.ok) {
          const result = await response.json();
          setCustomers(result.data); // Assuming the data is in the 'data' field
        } else {
          console.error("Failed to fetch customer data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true); // Set loading to true when the request starts
    try {
      // Check if the email and password match any customer data
      const matchedCustomer = customers.find(
        (customer) =>
          customer.Email === data.email && customer.Password === data.password
      );

      if (matchedCustomer) {
        // Redirect to the customer page using CustomerID
        router.push(`/customer/${matchedCustomer.CustomerID}`);
      } else {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  return (
    <FormProvider {...formMethods}>
      <ToastContainer /> {/* Add ToastContainer to render the toast notifications */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-10 min-h-screen text-white">
          <div className="col-span-5 bg-registration md:flex hidden flex-col justify-center items-center">
            <div className="w-1/2 text-center">
              <h1 className="plus-jakarta-sans-800 text-2xl bg-gradient-to-r uppercase from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                welcome to CRM
              </h1>
              <p className="font-light uppercase">Login or create new account</p>
            </div>
          </div>
          <div className="col-span-5 from-[#0d1137] bg-registration-mobile to-[#020515] 2xl:p-0 p-5 bg-gradient-to-b flex flex-col justify-center items-center gap-4">
            <div className="text-center md:hidden block">
              <h1 className="plus-jakarta-sans-800 text-2xl uppercase">
                welcome to cotexts
              </h1>
              <p className="font-light uppercase">Login or create new account</p>
            </div>
            <div className="2xl:w-1/2 xl:w-3/5 lg:w-[75%] md:w-[85%] sm:w-[90%] w-[90%] min-h-96 rounded-3xl plus-jakarta-sans-400 border-gray-400 border-2 p-8 from-[#0d1137] to-[#020515] bg-gradient-to-b">
              <div className="2xl:space-y-6 space-y-4">
                <div>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    placeholder="Your email address"
                    className="rounded-xl border-gray-400 border-2 py-5"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    placeholder="Your password"
                    className="rounded-xl border-gray-400 border-2 py-5"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg py-6"
                >
                  {loading ? (
                    <img
                      src="https://i.gifer.com/ZZ5H.gif"
                      alt="Loading"
                      className="mx-auto h-5 w-5 mt-2"
                    />
                  ) : (
                    "SIGN IN"
                  )}
                </button>
              </div>
            </div>
            <div className="text-center plus-jakarta-sans-400 mt-9">
              <span className="text-[#a0aec0] text-sm font-normal leading-[21px]">
                @ 2024, Made with ❤️ by{" "}
              </span>
              <span className="text-[#a0aec0] text-sm font-normal leading-[21px]">
                <strong>Infinity waves</strong> @ahkamboh
              </span>
              <span className="text-[#a0aec0] text-sm font-normal leading-[21px]">
                for a better web
              </span>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default Signin;
