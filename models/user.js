import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Last Name is Required!"]
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minlength: [6, "Password length Should Be Greater than 6 Character"],
        select: true
    },
    location: {type: String},
    profileUrl: {type: String},
    profession: {type: String},
    verificationToken: String,
    friends: [{type: Schema.Types.ObjectId, ref: "Users"}],
    views: {type: String},
    verified: {type: Boolean, default: false},
},
{ timestamps: true}
)

export default mongoose.model("User" , UserSchema)