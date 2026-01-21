import dbConnect from "@/lib/dbConnect";
import PaymentModel from "@/models/Payment";

interface createPaymentEntryParams {
    transactionId: string;
    amount: number;
    date: Date;
}

const registerPayement = async (payementDetails: createPaymentEntryParams) => {
    try{
        await dbConnect();
        const newPayment = await PaymentModel.create(payementDetails);

        if(!newPayment) {
            throw new Error("Failed to Save the payement details in database");
        }

        return JSON.parse(JSON.stringify(newPayment));

    } catch(error : any){
        console.log("failed to save payment details ", error.message);
        throw new Error(error.message || "Failed to save payement details");
    }
}

const getAllPaymentDetailsForUser = async (userId: string) => {
    try{
        // To-Do : why do i need visit first the bookings table and get all the transaction Ids and then again visit the transaction table
        // Instead : just save the userId for the payment table and get that with the userId itself
    } catch(error : any){
        console.log("failed to fetch payment details ", error.message);
        throw new Error(error.message || "Failed to fetch payement details");
    }
}
