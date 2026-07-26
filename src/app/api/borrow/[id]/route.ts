import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Borrow } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { action } = await req.json();
  await connectDB();
  
  if (action === 'borrow') {
    const item = await Borrow.findOneAndUpdate(
      { _id: params.id, status: 'available' },
      { status: 'borrowed', borrowerId: (session.user as any).id },
      { new: true }
    );
    if (!item) return NextResponse.json({ error: "Barang tidak tersedia" }, { status: 400 });
    return NextResponse.json(item);
  }
  
  if (action === 'return') {
    const item = await Borrow.findByIdAndUpdate(params.id, { status: 'available', borrowerId: null }, { new: true });
    return NextResponse.json(item);
  }
  
  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
