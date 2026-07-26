import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Withdrawal, User } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { amount, method, accountNumber, accountName } = await req.json();
  const userId = (session.user as any).id;

  await connectDB();
  const user = await User.findById(userId);

  if (!user || user.balance < amount) {
    return NextResponse.json({ error: "Saldo tidak cukup" }, { status: 400 });
  }

  // Deduct balance immediately
  user.balance -= amount;
  await user.save();

  const wd = await Withdrawal.create({ userId, amount, method, accountNumber, accountName });
  
  return NextResponse.json(wd);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectDB();
  const history = await Withdrawal.find({ userId: (session.user as any).id }).sort('-createdAt');
  return NextResponse.json(history);
}
