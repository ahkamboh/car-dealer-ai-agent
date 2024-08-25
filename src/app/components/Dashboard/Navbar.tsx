import React from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

type NavbarProps = {
  sidebarOpen: boolean; // Prop to track if the sidebar is open or closed
  toggleSidebar: () => void; // Function to toggle the sidebar
  userRole: string; // Prop for user role
  logoutUrl: string; // Prop for logout URL
  url: string; // Prop for the URL to be displayed as an image
};

const Navbar: React.FC<NavbarProps> = ({
  sidebarOpen,
  toggleSidebar,
  userRole,
  logoutUrl,
  url,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push(logoutUrl); // Redirect to the logout URL
  };

  return (
    <div>
      <div className="w-full h-14 p-2 bg-[#261e35] flex items-center justify-between">
        <div
          className={`h-10 w-10  justify-center bg-[#2f293e]  rounded-full cursor-pointer flex items-center group ${
            sidebarOpen ? "text-[#0D99FF]" : "text-[#888888]"
          }`}
          onClick={toggleSidebar}
        >
<svg width="8" height="14" viewBox="0 0 8 14"  className='group-hover:text-[#d8bcff] text-[#888888] transition-colors duration-300' fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_25_59)">
<path d="M7.27464 0.881607C7.49098 1.09795 7.51065 1.43649 7.33365 1.67505L7.27464 1.74339L2.01831 7L7.27464 12.2566C7.49098 12.473 7.51065 12.8115 7.33364 13.05L7.27464 13.1184C7.0583 13.3347 6.71976 13.3544 6.4812 13.1774L6.41286 13.1184L0.725356 7.43089C0.509014 7.21455 0.489347 6.87601 0.666353 6.63745L0.725356 6.56911L6.41286 0.881607C6.65083 0.643631 7.03667 0.643631 7.27464 0.881607Z" fill="currentColor" />
</g>
<defs>
<clipPath id="clip0_25_59">
<rect width="13" height="7.8" fill="white" transform="translate(7.8999 0.5) rotate(90)"/>
</clipPath>
</defs>
</svg>

        </div>
        <div className="text-white flex items-center gap-3 plus-jakarta-sans-400">
          {/* Display the image passed in the `url` prop */}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
