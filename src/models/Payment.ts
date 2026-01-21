import mongoose, { Schema, Document, Types } from "mongoose";

export interface Payment extends Document {
    transactionId: string;
    amount: number;
    date: Date;
}

const PaymentSchema: Schema<Payment> = new Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
},
{timestamps: true});


const PaymentModel = 
    (mongoose.models.Payment as mongoose.Model<Payment>) || 
    mongoose.model<Payment>("Payment", PaymentSchema);

export default PaymentModel;