// import nodemailer
import nodemailer from "nodemailer";

// send mail
export const sendMail = async (subject: string, html: string) => {
    // Create transporter inside the function so process.env is fully loaded and available
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Send the email using the transporter
    await transporter.sendMail({
        from: `"OpenSetup" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject,
        html
    });
};