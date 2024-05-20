import nodemailer from "nodemailer";


export async function sendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.SENDEREMAIL,
            pass: process.env.EMAILPASS,
        },
    });

    const info =  await transporter.sendMail({
        from: `RM Shop <${process.env.SENDEREMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });

    return info;
}