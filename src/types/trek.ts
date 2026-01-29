export type TrekBooking = {
  id: string
  customerName: string
  trekName: string
  startDate: string
  endDate: string
  status: "active" | "cancelled" | "completed"
  peopleCount: number
}
