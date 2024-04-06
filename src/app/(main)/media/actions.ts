"use server";
import { revalidatePath } from "next/cache";
import { createImages, deleteImage } from "./api";
import { Media } from "./Media";

export const addImages = async (params: Media[]) => {
  try {
    console.log(params);
    await createImages(params);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};

export const removeImage = async (id: number) => {
  try {
    await deleteImage(id);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    throw new Error("Failed");
  }
};
