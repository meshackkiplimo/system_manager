import { sendMail } from "@/config/mailer";

class EmailService {
    async sendVerificationCode(email:string,code:string){
        const subject= "Email Verification"
        const message =`your verification code is ${code}. Please use this code to verify your email address.`
        const html = `

         <h1>  Email verification  </h1>
            <p>your verification code is <strong>${code}</strong> </p>
            <p>This code will expiire in 30 nminutes</p>
           <p> If you did not request averification code please ignore</p>
        
        `;
        return await sendMail(email, subject, message, html);

    }
}

export const emailService = new EmailService();