// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method != "POST") {
        res.status(400).json({});
        return;
    }
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).json({});
        return;
    }
    if(name == "") {
        res.status(400).json({});
        return;
    } 
    if(email == "") {
        res.status(400).json({});
        return;
    } 
    if(!String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        res.status(400).json({});
        return;
    } 
    if(message == "") {
        res.status(400).json({});
        return;
    } 

    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.hosting.reg.ru',
            port: 587,
            auth: {
                user: 'info@495traffic.com',
                pass: 'fH6oI1tA3auA7eT0',
            },
        });

        const mailOptions = {
            from: 'info@495traffic.com',
            to: '495traffic@gmail.com', // Enter recipient email
            subject: `Новый ответ на форму от ${name}`,
            text: `Имя: ${name}\nEmail: ${email}\n\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({});
        return;
    } catch {
        res.status(500).json({});
        return;
    }
}
