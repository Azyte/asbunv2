import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Topup } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { amount, method, proof } = await req.json();
  if (!amount || amount < 10000) return NextResponse.json({ error: "Minimal topup Rp10.000" }, { status: 400 });

  await connectDB();
  const topup = await Topup.create({ userId: (session.user as any).id, amount, method, proof });
  return NextResponse.json(topup, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const history = await Topup.find({ userId: (session.user as any).id }).sort('-createdAt');
  return NextResponse.json(history);
}
