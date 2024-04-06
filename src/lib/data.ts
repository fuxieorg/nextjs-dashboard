import prisma from "@/lib/prisma";

export async function getCustomers() {
  return await prisma.customer.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteCustomersByIds(ids: number[]) {
  return prisma.customer.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function getCustomerById(id: number) {
  return await prisma.customer.findUnique({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
    },
    where: {
      id: id,
    },
  });
}

interface CustomerFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export async function updateCustomerByForm(formData: CustomerFormData) {
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id: formData.id,
    },
  });

  if (existingCustomer) {
    const updatedCustomer = await prisma.customer.update({
      where: {
        id: formData.id,
      },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      },
    });
    return { customer: updatedCustomer };
  } else {
    const createdCustomer = await prisma.customer.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      },
    });
    return { customer: createdCustomer };
  }
}

/**
 * Product
 */

interface ProductFormData {
  id: number;
  title: string;
  description: string;
  price: number;
  status: "active" | "draft" | "archived";
  content: string;
  imageIds: string;
}

export async function getProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      status: true,
    },
  });
}

export async function updateProductByForm(formData: ProductFormData) {
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
    return { product: createdProduct };
  }
}

export async function deleteProductsByIds(ids: number[]) {
  return prisma.product.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
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
            },
          },
        },
      },
    },
    where: {
      id: id,
    },
  });
}

/**
 * order
 *
 **/

export async function getOrders() {
  return await prisma.order.findMany({
    select: {
      id: true,
      orderSn: true,
      amount: true,
      payStatus: true,
      orderStatus: true,
      quantity: true,
      createdAt: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrderById(id: number) {
  return await prisma.order.findUnique({
    select: {
      id: true,
      orderSn: true,
      amount: true,
      payStatus: true,
      orderStatus: true,
      quantity: true,
      createdAt: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      products: {
        select: {
          productId: true,
          title: true,
          quantity: true,
          price: true,
        },
      },
    },
    where: {
      id: id,
    },
  });
}

interface OrderFormData {
  id: number;
  payStatus: "not_paid" | "paid" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled"
    | "returned";
  orderSn: string;
  amount: number;
  quantity: number;
  customerId: number;
  products: orderProduct[];
}
interface orderProduct {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export async function addOrderByForm(formData: OrderFormData) {
  const createdOrder = await prisma.order.create({
    data: {
      orderSn: formData.orderSn,
      amount: formData.amount,
      payStatus: formData.payStatus,
      orderStatus: formData.orderStatus,
      quantity: formData.quantity,
      customerId: formData.customerId,
      products: {
        createMany: {
          data: formData.products.map((product) => ({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            productId: product.productId,
          })),
        },
      },
    },
  });
  return { order: createdOrder };
}
