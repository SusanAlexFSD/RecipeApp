import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function ensureDemoData() {
  const { userId } = await auth();

  if (!userId) return;

  const user = await currentUser();

  const email = user?.emailAddresses[0]?.emailAddress;

  if (email !== "demo@susanalexander.dev") {
    return;
  }

  // Make sure the demo Clerk user exists in our database
  await prisma.user.upsert({
    where: {
      id: userId,
    },
    update: {
      email,
    },
    create: {
      id: userId,
      email,
    },
  });

  const existingClients = await prisma.client.count({
    where: {
      userId,
    },
  });

  // Demo data already exists
  if (existingClients > 0) {
    return;
  }

  await prisma.client.createMany({
    data: [
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+44 7700 900123",
        notes:
          "Sarah is working on building healthier weekly routines and improving consistency with her goals.",
        userId,
      },
      {
        name: "James Wilson",
        email: "james@example.com",
        phone: "+44 7700 900456",
        notes:
          "James wants to improve his productivity and create a more manageable weekly plan.",
        userId,
      },
      {
        name: "Emma Thompson",
        email: "emma@example.com",
        phone: "+44 7700 900789",
        notes:
          "Emma is focusing on confidence, organisation and maintaining consistent progress between sessions.",
        userId,
      },
    ],
  });
}