import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Merchant } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user && (session.user as { role?: string }).role === "admin";
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  await connectDB();
  const merchant = await Merchant.create({ ...body, menus: body.menus || [] });
  return NextResponse.json(merchant);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, action, menu, ...body } = await req.json();
  await connectDB();

  if (action === "add-menu") {
    const merchant = await Merchant.findByIdAndUpdate(id, { $push: { menus: menu } }, { new: true });
    return NextResponse.json(merchant);
  }

  if (action === "delete-menu") {
    const merchant = await Merchant.findByIdAndUpdate(id, { $pull: { menus: { name: menu.name } } }, { new: true });
    return NextResponse.json(merchant);
  }

  const merchant = await Merchant.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(merchant);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await connectDB();
  await Merchant.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
