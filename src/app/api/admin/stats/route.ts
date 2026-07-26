import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User, Order, Marketplace, Borrow } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectDB();
  const [userCount, orderCount, marketCount, borrowCount, revenue] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Marketplace.countDocuments(),
    Borrow.countDocuments(),
    Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$platformFee' } } }
    ])
  ]);
  return NextResponse.json({ userCount, orderCount, marketCount, borrowCount, revenue: revenue[0]?.total || 0 });
}
