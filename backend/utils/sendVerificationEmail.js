import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendVerificationEmail = async (user) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const verificationLink = `${process.env.APP_URL}/api/users/verify-email?token=${token}`;

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USERNAME, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
            },
        });

        // Email content
        const mailOptions = {
            from: `YourApp <${process.env.EMAIL_USERNAME}>`,
            to: user.email,
            subject: "Verify your email",
            html: `<p>Hello ${user.name},</p>
                   <p>Click the link below to verify your email:</p>
                   <a href="${verificationLink}">${verificationLink}</a>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Verification email sent!");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Could not send verification email.");
    }
};

export default sendVerificationEmail;
