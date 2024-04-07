export interface Order {
  id: number;
  orderSn: string;
  createdAt: string;
  amount: number;
  quantity: number;
  payStatus: "not_paid" | "paid" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled"
    | "returned";
  customer: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface OrderDetail {
  id: number;
  orderSn: string;
  createdAt: string;
  amount: number;
  quantity: number;
  payStatus: "not_paid" | "paid" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled"
    | "returned";
  customer: {
    id: number;
    firstName: string;
    lastName: string;
  };
  products: {
    productId: number;
    title: string;
    quantity: number;
    price: number;
  }[];
}

export interface OrderFormData {
  payStatus: "not_paid" | "paid" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled"
    | "returned";
  orderSn: string;
  amount: number;
  quantity: number;
  customerId: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}
