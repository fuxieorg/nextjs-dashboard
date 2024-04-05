"use server";
import { addImageByAction } from "@/lib/data";
import { generateOrderSn } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface Images {
  title: string;
  url: string;
  type: string;
}

export const addImages = async (params: Images[]) => {
  try {
    console.log(params);
    await addImageByAction(params);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};
