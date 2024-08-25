// src/app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    // Create a test account using Ethereal Email
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the Ethereal SMTP configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // Set up the email options
    const mailOptions = {
      from: testAccount.user, // Sender address
      to: email, // Recipient's email address
      subject: "Sign In to Update Your Profile", // Subject line
      text: `Please sign in using the following link: https://your-domain.com/signin?userId=${userId}`, // Plain text body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log the preview URL for testing purposes
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return NextResponse.json({
      message: "Email sent successfully",
      previewURL: nodemailer.getTestMessageUrl(info), // Provide a preview URL in the response
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
