import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Marketplace } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await req.json();
  await connectDB();
  
  const item = await Marketplace.create({
    sellerId: (session.user as any).id,
    ...body
  });
  
  return NextResponse.json(item, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('q');
  const query: any = { status: 'available' };
  if (search) query.name = { $regex: search, $options: 'i' };
  const items = await Marketplace.find(query).populate('sellerId', 'name room');
  return NextResponse.json(items);
}
