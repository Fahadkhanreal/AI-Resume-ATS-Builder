import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function getCurrentUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: No user ID found");
  }
  return userId;
}

export async function getCurrentUser() {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized: No user found");
  }

  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses[0]?.emailAddress ||
    `${user.id}@clerk.local`;
  const name = user.fullName || user.firstName || undefined;

  return prisma.user.upsert({
    where: { clerkId: user.id },
    update: { email, name },
    create: {
      clerkId: user.id,
      email,
      name,
    },
  });
}

export async function requireAuth() {
  const userId = await getCurrentUserId();
  const user = await getCurrentUser();
  return { userId, user };
}
