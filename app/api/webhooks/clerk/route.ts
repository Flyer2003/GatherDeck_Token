import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { syncUserWithAppwrite } from "@/lib/actions/auth.actions";

/**
 * Clerk webhook handler — POST /api/webhooks/clerk
 *
 * Setup (one-time):
 *  1. Go to Clerk Dashboard → Webhooks → Add Endpoint
 *  2. URL: https://gatherdeck.in/api/webhooks/clerk
 *  3. Subscribe to: user.created
 *  4. Copy the Signing Secret → add to .env.local as CLERK_WEBHOOK_SECRET
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[webhook] CLERK_WEBHOOK_SECRET is not set.");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  // Retrieve the Svix headers for signature verification
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  // Verify the webhook signature
  const body = await req.text();
  const wh = new Webhook(webhookSecret);

  let event: { type: string; data: any };

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as { type: string; data: any };
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  // Handle user.created — sync new Clerk user into Appwrite Auth exactly once
  if (event.type === "user.created") {
    const { id, first_name, last_name, email_addresses, phone_numbers } = event.data;

    await syncUserWithAppwrite({
      id,
      firstName: first_name,
      lastName: last_name,
      emailAddresses: email_addresses?.map((e: any) => ({
        emailAddress: e.email_address,
      })),
      phoneNumbers: phone_numbers?.map((p: any) => ({
        phoneNumber: p.phone_number,
      })),
    });

    console.log(`[webhook] user.created processed for: ${id}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
