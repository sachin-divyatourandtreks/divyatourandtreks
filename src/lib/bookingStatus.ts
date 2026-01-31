export function getBookingStatus(
    startDate: Date, Duration: number, paymentStatus: "pending" | "confirmed" | "cancelled"
): "Completed" | "Cancelled" | "Current" | "Upcoming" {
    const today = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Duration);

    if (paymentStatus === "cancelled") {
        return "Cancelled";
    } else if (today < startDate) {
        return "Upcoming";
    } else if (today >= startDate && today <= endDate) {
        if(paymentStatus === "confirmed") {
            return "Current";
        } else {
            return "Cancelled";
        }
    } else {
        return "Completed";
    }
}