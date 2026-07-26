import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { orderId } = await req.json();
  const jastiperId = (session.user as any).id;

  await connectDB();
  
  const order = await Order.findOneAndUpdate(
    { _id: orderId, status: 'pending', jastiperId: null },
    { $set: { status: 'accepted', jastiperId } },
    { new: true }
  );
  
  if (!order) return NextResponse.json({ error: "Sudah diambil orang lain" }, { status: 400 });
  
  return NextResponse.json(order);
}
