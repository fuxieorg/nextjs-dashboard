import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createCustomer(data: any) {
  return await prisma.customer.upsert({
    where: { email: data.email },
    update: {},
    create: data,
  });
}

async function main() {
  const customersData = [
    {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "202-555-0143",
    },
    {
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "202-555-0178",
    },
    {
      email: "william.johnson@example.com",
      firstName: "William",
      lastName: "Johnson",
      phoneNumber: "202-555-0192",
    },
    {
      email: "olivia.brown@example.com",
      firstName: "Olivia",
      lastName: "Brown",
      phoneNumber: "202-555-0156",
    },
    {
      email: "emma.jones@example.com",
      firstName: "Emma",
      lastName: "Jones",
      phoneNumber: "202-555-0129",
    },
    {
      email: "michael.miller@example.com",
      firstName: "Michael",
      lastName: "Miller",
      phoneNumber: "202-555-0147",
    },
    {
      email: "sophia.davis@example.com",
      firstName: "Sophia",
      lastName: "Davis",
      phoneNumber: "202-555-0181",
    },
    {
      email: "james.wilson@example.com",
      firstName: "James",
      lastName: "Wilson",
      phoneNumber: "202-555-0132",
    },
    {
      email: "isabella.martinez@example.com",
      firstName: "Isabella",
      lastName: "Martinez",
      phoneNumber: "202-555-0165",
    },
    {
      email: "logan.taylor@example.com",
      firstName: "Logan",
      lastName: "Taylor",
      phoneNumber: "202-555-0118",
    },
    {
      email: "ava.anderson@example.com",
      firstName: "Ava",
      lastName: "Anderson",
      phoneNumber: "202-555-0199",
    },
    {
      email: "lucas.thomas@example.com",
      firstName: "Lucas",
      lastName: "Thomas",
      phoneNumber: "202-555-0152",
    },
    {
      email: "mia.jackson@example.com",
      firstName: "Mia",
      lastName: "Jackson",
      phoneNumber: "202-555-0171",
    },
    {
      email: "benjamin.white@example.com",
      firstName: "Benjamin",
      lastName: "White",
      phoneNumber: "202-555-0141",
    },
    {
      email: "charlotte.harris@example.com",
      firstName: "Charlotte",
      lastName: "Harris",
      phoneNumber: "202-555-0135",
    },
    {
      email: "ethan.martin@example.com",
      firstName: "Ethan",
      lastName: "Martin",
      phoneNumber: "202-555-0184",
    },
    {
      email: "amelia.thompson@example.com",
      firstName: "Amelia",
      lastName: "Thompson",
      phoneNumber: "202-555-0126",
    },
    {
      email: "oliver.garcia@example.com",
      firstName: "Oliver",
      lastName: "Garcia",
      phoneNumber: "202-555-0196",
    },
    {
      email: "isabel.lopez@example.com",
      firstName: "Isabel",
      lastName: "Lopez",
      phoneNumber: "202-555-0159",
    },
    {
      email: "noah.gonzalez@example.com",
      firstName: "Noah",
      lastName: "Gonzalez",
      phoneNumber: "202-555-0138",
    },
  ];

  for (const customer of customersData) {
    await createCustomer(customer);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
