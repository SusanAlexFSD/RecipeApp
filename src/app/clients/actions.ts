"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createClient(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in");
  }

  const user = await currentUser();

  await prisma.user.upsert({
    where: {
      id: userId,
    },
    update: {
      email: user?.emailAddresses[0]?.emailAddress ?? "",
    },
    create: {
      id: userId,
      email: user?.emailAddresses[0]?.emailAddress ?? "",
    },
  });

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const notes = formData.get("notes") as string;

  if (!name) {
    throw new Error("Client name is required");
  }

  await prisma.client.create({
    data: {
      name,
      email,
      phone,
      notes,
      userId,
    },
  });

  redirect("/clients");
}

export async function deleteClient(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in");
  }

  const clientId = formData.get("clientId") as string;

  if (!clientId) {
    throw new Error("Client ID is required");
  }

  await prisma.client.delete({
    where: {
      id: clientId,
      userId,
    },
  });

  redirect("/clients");
}