import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Merchant } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const body = await req.json();
  await connectDB();
  const m = await Merchant.create(body);
  return NextResponse.json(m);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectDB();
  await Merchant.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
