// src/app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, userId, password } = await req.json(); // Receive email, userId, and password from the request body

    // Configure the transporter using your SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // True for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create a dynamic link with the CustomerID for profile update
    const dynamicLink = `http://localhost:3000/user/${userId}/`

    // Set up the email options
    const mailOptions = {
      from: process.env.SMTP_USER, // Sender address
      to: email, // Recipient's email address
      subject: "Sign In to Update Your Profile and Submit Feedback", // Subject line
      text: `Please sign in using the following link to update your profile and submit feedback: ${dynamicLink}\n\nYour password: ${password}`, // Plain text body with sign-in URL and password
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Email sent successfully",
      previewURL: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
