"use server";

import { revalidatePath } from "next/cache";
import { deleteProducts, updateProduct } from "./api";
import { ProductFormData } from "./product";

export const removeProductsAction = async (ids: number[]) => {
  try {
    await deleteProducts(ids);
    revalidatePath("/");
    return { message: "successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const rawFormData: ProductFormData = {
      id: Number(formData.get("id")) || 0,
      title: String(formData.get("title")) || "",
      description: String(formData.get("description")) || "",
      price: Number(formData.get("price")) || 0,
      status: formData.get("status") as "active" | "draft" | "archived",
      content: String(formData.get("content")) || "",
      imageIds: String(formData.get("imageIds")) || "",
    };

    await updateProduct(rawFormData);
    revalidatePath("/");

    return { message: "Product updated successfully." };
  } catch (error) {
    console.error("Product update failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to update product.";
    return { message: errorMessage };
  }
};
