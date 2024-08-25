// // src/app/profile/[userId]/page.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { FormProvider, useForm } from "react-hook-form";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define the interfaces for your form and user data
// interface FormData {
//   Name?: string;
//   Email?: string;
//   City?: string;
//   VisitOutcome?: string;
//   CallOutcome?: string;
//   ProfilePicture?: FileList;
//   Feedback: string;
// }

// interface UserData {
//   Name: string;
//   Email: string;
//   City: string;
//   VisitOutcome: string;
//   CallOutcome: string;
//   ProfilePicture: string; // Assuming this is a URL or path to the profile picture
//   Feedback: string;
//   // Add any other fields you expect in userData
// }

// function ProfileUpdate() {
//   const params = useParams();
//   const { userId } = params;
//   const formMethods = useForm<FormData>();
//   const { handleSubmit, register, formState: { errors } } = formMethods;
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`/api/customer/read?CustomerID=${userId}`);
//         if (response.ok) {
//           const result: UserData = await response.json();
//           setUserData(result);
//         } else {
//           toast.error("Failed to load user data.");
//         }
//       } catch (error) {
//         toast.error("An error occurred. Please try again.");
//       }
//     };
//     fetchUserData();
//   }, [userId]);

//   const onSubmit = async (data: FormData) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/customer/update?CustomerID=${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success("Profile updated successfully!");
//       } else {
//         toast.error("Failed to update profile.");
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <FormProvider {...formMethods}>
//       <ToastContainer />
//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               placeholder="Your name"
//               defaultValue={userData.Name}
//               {...register("Name")}
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="Your email"
//               defaultValue={userData.Email}
//               {...register("Email")}
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="city">City</Label>
//             <Input
//               id="city"
//               placeholder="Your city"
//               defaultValue={userData.City}
//               {...register("City")}
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="visitOutcome">Visit Outcome</Label>
//             <select
//               id="visitOutcome"
//               defaultValue={userData.VisitOutcome}
//               {...register("VisitOutcome")}
//               className="w-full border p-2 rounded"
//             >
//               <option value="Success">Success</option>
//               <option value="Failure">Failure</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="callOutcome">Call Outcome</Label>
//             <select
//               id="callOutcome"
//               defaultValue={userData.CallOutcome}
//               {...register("CallOutcome")}
//               className="w-full border p-2 rounded"
//             >
//               <option value="Sale">Sale</option>
//               <option value="No Sale">No Sale</option>
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="profilePicture">Profile Picture</Label>
//             <input
//               id="profilePicture"
//               type="file"
//               {...register("ProfilePicture")}
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="feedback">Feedback <span className="text-red-500">*</span></Label>
//             <textarea
//               id="feedback"
//               placeholder="Your feedback"
//               {...register("Feedback", { required: "Feedback is required" })}
//               className="w-full border p-2 rounded"
//             ></textarea>
//             {errors.Feedback?.message && (
//               <p className="text-red-500">{errors.Feedback.message.toString()}</p>
//             )}
//           </div>
//           <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg py-2">
//             {loading ? "Updating..." : "Update Profile"}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

// export default ProfileUpdate;
