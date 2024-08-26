import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
const inter = Inter({ subsets: ["latin"] });

const imageUrl = "https://car-ai-agent.vercel.app/logo.svg"; // Update with your actual image URL

export const metadata: Metadata = {
  title: {
    default: "Cortex | Fuel Your Car Dealership with AI Insights",
    template: "%s | Cortex",
  },
  description:
    "Unlock deeper customer insights and elevate experiences with Cortex's AI-powered dashboard tailored for car dealerships.",
  keywords:
    "Cortex, AI dashboard, car dealership insights, customer experience, AI-powered platform, customer data analytics",
  openGraph: {
    title: "Cortex | Fuel Your Car Dealership with AI Insights",
    description:
      "Unlock deeper customer insights and elevate experiences with Cortex's AI-powered dashboard tailored for car dealerships.",
    url: "https://yourwebsite.com", // Replace with your actual website URL
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Cortex - AI Dashboard for Car Dealerships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortex | Fuel Your Car Dealership with AI Insights",
    description:
      "Unlock deeper customer insights and elevate experiences with Cortex's AI-powered dashboard tailored for car dealerships.",
    images: [imageUrl],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: { colorPrimary: "#d93ab5" },
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}1
