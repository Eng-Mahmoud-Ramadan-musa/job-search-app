import { EventEmitter } from "events";
import { sendEmail } from "./sendEmail.js";
import { otpTemplate } from "./otpTemplate.js";

export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email, subject , otp) => {
    await sendEmail({ to: email, subject, html: otpTemplate(otp, subject) })
        .then(ele => console.log(`📧 Email sent successfully to ${email}`)
        ).catch(error =>
        console.error(`🚨 Error sending email to ${email}:`, error.message)
    
)})