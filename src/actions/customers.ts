"use server";

import { deleteCustomersByIds, updateCustomerByForm } from "@/lib/data";
import { revalidatePath } from "next/cache";

export const removeCustomers = async (ids: number[]) => {
  try {
    await deleteCustomersByIds(ids);
    revalidatePath("/");
    return { message: "Customers removed successfully" };
  } catch (error) {
    throw new Error("Failed to remove customers");
  }
};

export const updateCustomer = async (prevState: any, formData: FormData) => {
  try {
    const rawFormData = {
      id: Number(formData.get("id")),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };
    console.log(rawFormData);
    await updateCustomerByForm(rawFormData);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
