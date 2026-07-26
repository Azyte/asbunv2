import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Merchant } from "@/lib/models";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const merchants = await Merchant.find();
  return NextResponse.json(merchants);
}
