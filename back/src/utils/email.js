import nodemailer from "nodemailer";
import { emailTemplete, sendCodeTemplete } from "./emailTemplete.js";


export async function sendEmail(to,subject, userName = '' , token){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.SENDEREMAIL,
            pass: process.env.EMAILPASS,
        },
    });

    const info =  await transporter.sendMail({
        from: `AI PHARMACY <${process.env.SENDEREMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html: emailTemplete(to,userName, token), // html body
    });

    return info;
}

export async function sendUserCode(to,subject, code){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.SENDEREMAIL,
            pass: process.env.EMAILPASS,
        },
    });

    const info =  await transporter.sendMail({
        from: `AI PHARMACY <${process.env.SENDEREMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html: sendCodeTemplete(to,code), // html body
    });

    return info;
}