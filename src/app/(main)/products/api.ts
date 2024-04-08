import prisma from "@/lib/prisma";
import { Product, ProductDetail, ProductFormData } from "./product";

export async function findProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      status: true,
    },
  });
  return JSON.parse(JSON.stringify(products));
}

export async function updateProduct(formData: ProductFormData) {
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: formData.id,
    },
  });

  if (existingProduct) {
    if (formData.imageIds) {
      const imagesArr = formData.imageIds
        .split(",")
        .map((image) => Number(image));

      await prisma.imagesOnProducts.deleteMany({
        where: {
          productId: formData.id,
          imageId: {
            notIn: imagesArr,
          },
        },
      });

      const existingImages = await prisma.imagesOnProducts.findMany({
        where: {
          productId: formData.id,
        },
        select: {
          imageId: true,
        },
      });
      const existingImageIds = existingImages.map((image) => image.imageId);
      const imageIdsToAdd = imagesArr.filter(
        (imageId) => !existingImageIds.includes(imageId),
      );

      if (imageIdsToAdd.length > 0) {
        await prisma.imagesOnProducts.createMany({
          data: imageIdsToAdd.map((imageId) => ({
            productId: formData.id,
            imageId,
          })),
          skipDuplicates: true,
        });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: formData.id,
      },
      data: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        status: formData.status,
        content: formData.content,
      },
    });
    return { product: updatedProduct };
  } else {
    const createdProduct = await prisma.product.create({
      data: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        status: formData.status,
        content: formData.content,
      },
    });
    if (formData.imageIds) {
      const imagesArr = formData.imageIds
        .split(",")
        .map((image) => Number(image))
        .filter((imageId) => !isNaN(imageId));

      await prisma.imagesOnProducts.createMany({
        data: imagesArr.map((imageId) => ({
          productId: createdProduct.id,
          imageId,
        })),
        skipDuplicates: true,
      });
    }
    return { product: createdProduct };
  }
}

export async function deleteProducts(ids: number[]) {
  await prisma.product.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  await prisma.imagesOnProducts.deleteMany({
    where: {
      productId: {
        in: ids,
      },
    },
  });
  return { code: 1, message: "success" };
}

export async function findProduct(id: number): Promise<ProductDetail> {
  const product = await prisma.product.findUnique({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      status: true,
      content: true,
      image: {
        select: {
          image: {
            select: {
              id: true,
              title: true,
              url: true,
              type: true,
            },
          },
        },
      },
    },
    where: {
      id: id,
    },
  });
  return JSON.parse(JSON.stringify(product));
}
