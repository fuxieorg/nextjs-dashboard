import prisma from "@/lib/prisma";
import { AddMedia, Media } from "./media";

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

export async function createImages(params: AddMedia[]) {
  return await prisma.image.createMany({
    data: [...params],
  });
}

export async function deleteImages(ids: number[]) {
  const count = await prisma.imagesOnProducts.count({
    where: {
      imageId: {
        in: ids,
      },
    },
  });
  if (count > 0) {
    return {
      code: 0,
      data: {},
      message: "Images are used elsewhere and cannot be deleted",
    };
  }

  await prisma.image.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return {
    code: 1,
    data: {},
    message: "Success",
  };
}
