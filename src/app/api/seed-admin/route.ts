import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const email = "admin@asbun.com";
    const password = "admin12345";
    const hashed = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      {
        name: "Admin ASBUN",
        email,
        password: hashed,
        room: "Admin",
        role: "admin",
        balance: 0,
        rating: 5,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ email, password, role: "admin" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
