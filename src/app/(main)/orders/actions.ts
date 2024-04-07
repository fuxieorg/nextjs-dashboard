"use server";
import { generateOrderSn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { createOrder } from "./api";
import { OrderFormData, OrderProduct } from "./order";

const calculateTotals = (products: any) => {
  const totals = products.reduce(
    (acc: any, product: any) => {
      acc.totalPrice += product.price * product.quantity;
      acc.totalQuantity += product.quantity;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 },
  );
  return totals;
};

export const addOrderAction = async (
  products: OrderProduct[],
  formData: FormData,
) => {
  try {
    const rawFormData: OrderFormData = {
      orderSn: generateOrderSn(),
      amount: calculateTotals(products).totalPrice,
      quantity: calculateTotals(products).totalQuantity,
      payStatus: formData.get("payStatus") as "not_paid" | "paid" | "refunded",
      orderStatus: formData.get("orderStatus") as
        | "pending"
        | "processing"
        | "shipped"
        | "completed"
        | "cancelled"
        | "returned",
      customerId: 1,
      products: products,
    };
    await createOrder(rawFormData);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
