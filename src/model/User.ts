import mongoose, { Schema, Document, Mongoose } from "mongoose";

import { v4 as uuidv4 } from 'uuid';

export interface User extends Document {
    userId: string;
    username: string;
    gender: string;
    phoneNo: string;
    email: string; 
    password: string; 
}

const UserSchema: Schema<User> = new Schema({
    userId: {
        type: String,
        unique: true,
        default: () => uuidv4(),
    },
    username: {
        type: String,
        required: [true, "Username Required"]
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },
    phoneNo: {
        type: String,
        required: [true, "phone number required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;