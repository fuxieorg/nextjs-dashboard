"use server";
import { revalidatePath } from "next/cache";
import { createImages, deleteImages } from "./api";
import { AddMedia, Media } from "./media";

export const addImagesAction = async (params: AddMedia[]) => {
  try {
    console.log(params);
    await createImages(params);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    return { message: "Failed" };
  }
};

export const removeImageAction = async (ids: number[]) => {
  try {
    await deleteImages(ids);
    revalidatePath("/");
    return { message: "Successfully" };
  } catch (error) {
    throw new Error("Failed");
  }
};
