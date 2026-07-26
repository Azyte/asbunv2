import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectDB();
  const users = await User.find().select('-password').sort('-createdAt');
  return NextResponse.json(users);
}
