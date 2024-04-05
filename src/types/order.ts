export interface Order {
  id: number;
  orderSn: string;
  createdAt: string;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
  };
  amount: number;
  payStatus: "not_paid" | "paid" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled"
    | "returned";
  number: number;
}
