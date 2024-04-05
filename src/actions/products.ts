"use server";

import { deleteProductsByIds, updateProductByForm } from "@/lib/data";
import { revalidatePath } from "next/cache";

export const removeProducts = async (ids: number[]) => {
  try {
    await deleteProductsByIds(ids);
    revalidatePath("/");
    return { message: "successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};

export const updateProduct = async (prevState: any, formData: FormData) => {
  try {
    const rawFormData = {
      id: Number(formData.get("id")),
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price"))?.toFixed(2),
      status: formData.get("status"),
      content: formData.get("content"),
    };
    await updateProductByForm(rawFormData);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
