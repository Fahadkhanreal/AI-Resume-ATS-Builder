import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type ClerkWebhookEvent = {
  type: string;
  data: {
    id?: string;
    email_addresses?: Array<{ email_address?: string }>;
    first_name?: string | null;
  };
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkWebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  const eventType = evt.type;
  const { id, email_addresses, first_name } = evt.data;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  if (eventType === "user.created" || eventType === "user.updated") {
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        email: email_addresses?.[0]?.email_address || "",
        name: first_name || undefined,
      },
      create: {
        clerkId: id,
        email: email_addresses?.[0]?.email_address || "",
        name: first_name || undefined,
      },
    });
  }

  if (eventType === "user.deleted") {
    await prisma.user.delete({
      where: { clerkId: id },
    });
  }

  return NextResponse.json({ success: true });
}
