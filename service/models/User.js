import { Schema, model } from 'mongoose'

const user = Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        confirmPassword: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }

)
export default model("User", user)