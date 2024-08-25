import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#b783eb] to-[#e81a9d]">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
