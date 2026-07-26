import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await req.json();
  await connectDB();
  
  const order = await Order.create({
    userId: (session.user as any).id,
    ...body
  });
  
  return NextResponse.json(order);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  await connectDB();
  
  const query: any = {};
  if (status === 'pending') query.status = 'pending';
  
  const orders = await Order.find(query).populate('userId', 'name room').populate('merchantId');
  return NextResponse.json(orders);
}
