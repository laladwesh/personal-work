import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // "smtp.gmail.com"
      port: 587, // Use 465 with secure: true for SSL or 587 with secure: false for TLS
      secure: false, // Set true for SSL and port 465
      auth: {
        user: process.env.MAIL_USER, // Gmail address
        pass: process.env.MAIL_PASS, // App password
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: `"OTP from Shivalik Graphics" <${process.env.MAIL_USER}>`, // Sender address
      to: email, // Recipient address
      subject: title, // Email subject
      html: body, // Email content
    });

   // console.log("Email sent successfully: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};

export default mailSender;
