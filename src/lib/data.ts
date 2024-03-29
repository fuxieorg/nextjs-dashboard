import prisma from "@/lib/prisma";

export async function getCustomers({
  pageNumber = 1,
  pageSize = 20,
  searchQuery = "",
}) {
  const data = await prisma.customer.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
        },
      },
    },
    where: {
      OR: [
        {
          firstName: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "asc",
    },
    skip: (Number(pageNumber) - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.customer.count({
    where: {
      OR: [
        {
          firstName: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalCount, totalPages };
}

export async function removeCustomers(ids: number[]) {
  return prisma.customer.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}
