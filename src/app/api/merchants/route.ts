import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Merchant } from "@/lib/models";

export async function GET() {
  await connectDB();
  const merchants = await Merchant.find();
  return NextResponse.json(merchants);
}
