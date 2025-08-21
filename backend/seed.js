import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Create a demo user (or reuse if it exists)
  const user = await prisma.user.upsert({
    where: { email: "demo@gmail.com" },
    update: {}, // nothing to update if it already exists
    create: {
      email: "demo@gmail.com",
      password_hash: "123", // ⚠️ replace with a real hash in production
    },
  });

  // 2. Create a demo account linked to the user
  const account = await prisma.account.upsert({
    where: { id: "demo-account-id" }, // use a fixed id to avoid duplicates
    update: {},
    create: {
      id: "demo-account-id",
      name: "Demo Account",
      type: "Bank",
      balance: new Prisma.Decimal(1000.00),
      userId: user.id,
    },
  });

  console.log("✅ Seeded demo user and account:", { user, account });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
