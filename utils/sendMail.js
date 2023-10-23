import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { v4 as uuidv4} from 'uuid'
import { hashString } from './pass.js'
import EmailVerification from '../models/emailVerification.js'

dotenv.config()

const { AUTH_EMAIL, APP_URL} = process.env

let transporter = nodemailer.createTransport({
    host: "smtp.mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
    }
})

export const SendVerificationEmail = async (user , res) => {
    const {_id, email, lastName} = user

    const token = _id + uuidv4()

    const link = APP_URL + "users/verify/" + _id + "/" + token

    const mailOption = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333' >
            <h1 style="color: rgb(8, 56, 188)">Please Verify Your Email Address</h1>
            <hr>
            <h4>Hi ${lastName},</h4>
            <p>
                Please Verify Your Email Address So We Can Know That it's Really You.
                <br>
            <p>This link <b>Expires in 1 hour</b></p>
            <br>
            <a href=${link} style="color: #fff; padding: 14px; text-decoration: none; background-color: #000">Email Address</a></p>
            <div style="margin-top: 20px">
            <h5>Best Regards</h5>
            <h5>Reza Team</h5>
            </div>
            </div>
        `
    }

    try {
        const hashedToken = await hashString(token)

        const newVerifiedEmail = await EmailVerification.create({
            userId: _id,
            token: hashedToken,
            createdAt: Date.now(),
            updatedAt: Date.now() + 3600000
        })

        if(newVerifiedEmail){
            transporter.sendMail(mailOption)
            .then(() => {
                res.status(201).send({
                    success: "PENDING",
                    message: "Verification email has been sent to your account. Check your email for further instruction"
                })
            })
        }
    } catch (error) {
        
    }
}