import nodemailer from 'nodemailer'
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "anjilamagar506@gmail.com",
        pass: "zvkavykrfxilvxsm",
    },
});

// Wrap in an async IIFE so we can use await.
export const sendMail = async (otp, email) => {
    const info = await transporter.sendMail({
        from: '"your Boss" <anjilamagar>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?", // plain‑text body
        html: `<b>Your OTP is: ${otp}. </b>`, // HTML body
    });

    console.log("Message sent:", info.messageId);
};