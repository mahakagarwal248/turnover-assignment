/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";
const sendEmail = async (
  /** @type {{ to: string[]; subject: string; text: string; }} */ data,
) => {
  try {
    const { to, subject, text } = data;
    // Create a Nodemailer transporter using your SMTP credentials
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "easycoding2000@gmail.com", // Your Gmail address
        pass: "gzdjedkvgdwegxks", // Your Gmail password
      },
    });

    // Create the email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { status: 200, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { status: 500, message: "Failed to send email" };
  }
};

export default sendEmail;
