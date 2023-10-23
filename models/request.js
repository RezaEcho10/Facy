import mongoose, { Schema } from "mongoose"

const RequestSchema = new mongoose.Schema({
    requestTo: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    requestFrom: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    requestStatus: {
        type: String,
        default: "Pending"
    },
},
{ timestamps: true}
)

export default mongoose.model("Request" , RequestSchema)