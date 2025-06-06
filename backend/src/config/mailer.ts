import nodemailer from 'nodemailer';


export const sendMail = async (
    email: string,
    subject: string,
    text: string,
    html?: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            service:'gmail', 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },

        })
        const mailOptions ={
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text,
            html: html 
        }
        const mailRes= await transporter.sendMail(mailOptions);
        if (mailRes.accepted.length > 0) {
            console.log(`Email sent successfully to ${email}`);
        } else {
            console.error(`Failed to send email to ${email}`);
        }
        
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
        
    }


    
}