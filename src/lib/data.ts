import prisma from "@/lib/prisma";
import { Product } from "@/types/product";

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

/**
 * image
 *
 **/

export async function getImages() {
  return await prisma.image.findMany({
    select: {
      id: true,
      title: true,
      url: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

interface Images {
  title: string;
  url: string;
  type: string;
}
export async function addImageByAction(params: Images[]) {
  return await prisma.image.createMany({
    data: [...params],
  });
}

export async function deleteImagesById(id: number) {
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
