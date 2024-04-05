"use server";
import { addOrderByForm } from "@/lib/data";
import { generateOrderSn } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addOrder = async (products: any, formData: FormData) => {
  function calculateTotals(products: any) {
    const totals = products.reduce(
      (acc: any, product: any) => {
        acc.totalPrice += product.price * product.quantity;
        acc.totalQuantity += product.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 },
    );
    return totals;
  }

  try {
    const rawFormData = {
      orderSn: generateOrderSn(),
      amount: calculateTotals(products).totalPrice,
      quantity: calculateTotals(products).totalQuantity,
      payStatus: formData.get("payStatus"),
      orderStatus: formData.get("orderStatus"),
      customerId: 1,
      products: products,
    };
    await addOrderByForm(rawFormData);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
