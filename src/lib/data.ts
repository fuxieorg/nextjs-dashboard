import prisma from "@/lib/prisma";
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
