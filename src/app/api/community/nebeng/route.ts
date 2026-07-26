import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Nebeng } from "@/lib/models/community";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  await connectDB();
  const item = await Nebeng.create({ userId: (session.user as any).id, ...body });
  return NextResponse.json(item, { status: 201 });
}

export async function GET() {
  await connectDB();
  const items = await Nebeng.find({ status: 'open' }).populate('userId', 'name room').sort('-createdAt');
  return NextResponse.json(items);
}
