import prisma from "@/lib/prisma";
import { Media } from "./Media";

export async function findImages() {
  return await prisma.image.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      type: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createImages(params: Media[]) {
  return await prisma.image.createMany({
    data: [...params],
  });
}

export async function deleteImage(id: number) {
  const count = await prisma.imagesOnProducts.count({
    where: {
      imageId: id,
    },
  });
  if (count > 0) {
    return {
      code: 0,
      data: {},
      message: "Images are used elsewhere and cannot be deleted",
    };
  }

  await prisma.image.delete({
    where: {
      id: id,
    },
  });
  return {
    code: 1,
    data: {},
    message: "Success",
  };
}
