import mongoose, { Schema } from "mongoose"

const EmailVerificationSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    token: {
        type: String
    },
    createdAt: {
        Date
    },
    expiresAt: {
        Date
    },
})

export default mongoose.model("EmailVerification" , EmailVerificationSchema)