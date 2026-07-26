import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User, Order } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectDB();
  const user = await User.findById((session.user as any).id).select('-password');
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  const orderCount = await Order.countDocuments({ userId: user._id });
  const jastipCount = await Order.countDocuments({ jastiperId: user._id });
  
  return NextResponse.json({ ...user.toObject(), orderCount, jastipCount });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await req.json();
  await connectDB();
  const user = await User.findByIdAndUpdate((session.user as any).id, body, { new: true }).select('-password');
  return NextResponse.json(user);
}
