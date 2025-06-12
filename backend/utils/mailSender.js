import nodemailer from "nodemailer";

// Asynchronous function to send emails using nodemailer
const mailSender = async (email, title, body) => {
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,   // SMTP host (e.g., "smtp.gmail.com")
      port: 587,                     // Port number (587 for TLS, 465 for SSL)
      secure: false,                 // Use true for SSL (port 465), false for TLS (port 587)
      auth: {
        user: process.env.MAIL_USER, // SMTP username (your email address)
        pass: process.env.MAIL_PASS, // SMTP password or app password
      },
    });

    // Email sending options
    let info = await transporter.sendMail({
      from: `"OTP from Shivalik Graphics" <${process.env.MAIL_USER}>`, // Sender info
      to: email,         // Recipient email address
      subject: title,    // Subject of the email
      html: body,        // HTML body of the email
    });

    // Optionally log messageId for debugging
    // console.log("Email sent successfully: ", info.messageId);
    return info; // Return info about the sent email
  } catch (error) {
    // Log and throw error if email sending fails
    console.error("Error sending email: ", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};

export default mailSender;
