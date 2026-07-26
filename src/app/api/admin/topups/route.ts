import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Topup, User } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user && (session.user as { role?: string }).role === "admin";
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const topups = await Topup.find().populate('userId', 'name email room').sort('-createdAt');
  return NextResponse.json(topups);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, status } = await req.json();
  await connectDB();

  const topup = await Topup.findById(id);
  if (!topup) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (topup.status !== 'pending') return NextResponse.json({ error: "Already processed" }, { status: 400 });

  topup.status = status;
  await topup.save();

  if (status === 'approved') {
    await User.findByIdAndUpdate(topup.userId, { $inc: { balance: topup.amount } });
  }

  return NextResponse.json(topup);
}
