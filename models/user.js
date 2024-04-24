import mongoose from "mongoose";
import bcrypt from "bcrypt";


const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            minlength: 3,
            required: false,
        },
        lastName: {
            type: String,
            minlength: 3,
            required: false,
        },
        Adress: {
            type: String,
            minlength: 3,
            required: false,
        },
        username: {
            type: String,
            minlength: 3,
            trim: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,

        },
        phoneNumber: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true,
            enum: ["ADMIN", "AUTISTE", "DOCTOR"],
           
        },
        archived: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);



userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }

}


userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});



export default model("User", userSchema);
