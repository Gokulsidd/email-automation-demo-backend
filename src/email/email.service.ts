import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { emailConfig } from "./email.config";

@Injectable()
export class EmailService {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport(emailConfig)
    }

    async sendEmail(to: string, subject: string, text: string ) : Promise<void> {
        const mailOptions = {
            from:process.env.EMAIL_USER,
            to,
            subject,
            text,
        }

        await this.transporter.sendMail(mailOptions , (err : any ,info: any)=> {
            if(err){
                console.log(err)
                return;
            }
            console.log(info.response)
        })
    }
}