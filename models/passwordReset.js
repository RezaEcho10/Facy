import mongoose, { Schema } from "mongoose"

const PasswordResetSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    token: String,
    createdAt: Date,
    expiresAt: Date
},
{ timestamps: true}
)

export default mongoose.model("PasswordReset" , PasswordResetSchema)