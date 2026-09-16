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
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: No user found");
  }

  // Fast path: Check local database first without slow external Clerk network requests
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  // Fallback if user is not in database yet: fetch details from Clerk and create
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
  const user = await getCurrentUser();
  return { userId: user.clerkId, user };
}
