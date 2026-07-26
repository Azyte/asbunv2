import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Withdrawal, User } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  await connectDB();
  const reqs = await Withdrawal.find().populate('userId', 'name').sort('-createdAt');
  return NextResponse.json(reqs);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { id, status } = await req.json();
  await connectDB();
  
  const wd = await Withdrawal.findById(id);
  if (!wd) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (wd.status !== 'pending') return NextResponse.json({ error: "Already processed" }, { status: 400 });

  if (status === 'rejected') {
    // Refund balance
    const user = await User.findById(wd.userId);
    if (user) {
      user.balance += wd.amount;
      await user.save();
    }
  }

  wd.status = status;
  await wd.save();
  
  return NextResponse.json(wd);
}
