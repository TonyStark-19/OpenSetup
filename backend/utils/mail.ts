// import nodemailer
import nodemailer from "nodemailer";

// transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// send mail
export const sendMail = async (subject: string, html: string) => {
    await transporter.sendMail({
        from: `"OpenSetup" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject,
        html
    });
};