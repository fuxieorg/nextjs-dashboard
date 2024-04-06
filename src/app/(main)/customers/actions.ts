"use server";

import { revalidatePath } from "next/cache";
import { deleteCustomers, updateCustomer } from "./api";
import { CustomerFormData } from "./customer";

export const removeCustomersAction = async (ids: number[]) => {
  try {
    await deleteCustomers(ids);
    revalidatePath("/");
    return { message: "Customers removed successfully" };
  } catch (error) {
    throw new Error("Failed to remove customers");
  }
};

export const updateCustomerAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const rawFormData: CustomerFormData = {
      id: Number(formData.get("id")),
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),
      email: String(formData.get("email")),
      phoneNumber: String(formData.get("phoneNumber")),
    };
    await updateCustomer(rawFormData);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
