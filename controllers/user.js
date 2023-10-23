import User from '../models/user.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { hashString } from "../utils/pass.js"
import { SendVerificationEmail } from "../utils/sendMail.js"

export const Register = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName || !email || !password){
        next("Provide Required Fields!")
        return
    }
    try {

        const existingUser = await User.findOne({email})

        if(existingUser){
            res.status(401).json('email already registered ')
        }

        const hashedPassword = await hashString(password)

        const user = new User({firstName, lastName, email, password: hashedPassword})

        await user.save()
        res.status(200).json(user)
        SendVerificationEmail(user, res)
    } catch (err) {
        console.log(err);
        console.log('Register Invalid');
    }
}

export const Login = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        next("Email Or Password Invalid")
        return
    }
    try {

        //Check if the email is already login
        const user = await User.findOne({email}).select("+password").populate({
            path: "friends",
            select: "fristName lastName location profileUrl -password"
        })

        const isMatch = await compareString(password, user?.password)
        if(!user){
            res.status(401).json({message: "Invalid email and password"})
        }

        // Check if the password is correct
        if(user.password != password){
            res.status(401).json({message: "Invalid password"})
        }

        const token = jwt.sign({userId: user._id}, secretKey)

        res.status(200).json({token})
    } catch (err) {
        
    }
}