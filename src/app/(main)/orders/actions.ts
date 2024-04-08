"use server";
import { generateOrderSn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { createOrder } from "./api";
import { OrderFormData, OrderProduct, OrderSubmitData } from "./order";

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

export const addOrderAction = async (formData: OrderSubmitData) => {
  try {
    const rawFormData: OrderFormData = {
      orderSn: generateOrderSn(),
      amount: calculateTotals(formData.products).totalPrice,
      quantity: calculateTotals(formData.products).totalQuantity,
      payStatus: formData.payStatus as "not_paid" | "paid" | "refunded",
      orderStatus: formData.orderStatus as
        | "pending"
        | "processing"
        | "shipped"
        | "completed"
        | "cancelled"
        | "returned",
      customerId: 1,
      products: formData.products as unknown as OrderProduct[],
    };
    await createOrder(rawFormData);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
