import prisma from "@/lib/prisma";
import { Order, OrderDetail, OrderFormData } from "./order";

export async function findOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
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
  return JSON.parse(JSON.stringify(orders));
}

export async function findOrder(id: number): Promise<OrderDetail> {
  const order = await prisma.order.findUnique({
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
  return JSON.parse(JSON.stringify(order));
}

export async function createOrder(formData: OrderFormData) {
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
