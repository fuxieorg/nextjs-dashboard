import prisma from "@/lib/prisma";
import { Customer, CustomerFormData } from "./customer";

export async function findCustomers(): Promise<Customer[]> {
  return await prisma.customer.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      phoneNumber: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteCustomers(ids: number[]) {
  return prisma.customer.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function findCustomer(id: number): Promise<Customer | null> {
  return await prisma.customer.findUnique({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      phoneNumber: true,
    },
    where: {
      id: id,
    },
  });
}

export async function updateCustomer(
  formData: CustomerFormData,
): Promise<Customer> {
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id: formData.id,
    },
  });

  if (existingCustomer) {
    return await prisma.customer.update({
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
  } else {
    return await prisma.customer.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      },
    });
  }
}
