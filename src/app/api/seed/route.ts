import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Merchant } from "@/lib/models";

const MERCHANTS = [
  {
    name: "Mixue Botani",
    address: "Botani Square, Bogor",
    zone: "B",
    distanceKm: 3.5,
    menus: [
      { name: "Boba Sundae", price: 16000 },
      { name: "Mi-Sundae Mango", price: 16000 },
      { name: "Lemonade", price: 10000 },
    ]
  },
  {
    name: "McDonald's Pajajaran",
    address: "Jl. Raya Pajajaran",
    zone: "A",
    distanceKm: 1.5,
    menus: [
      { name: "PaNas 1", price: 38000 },
      { name: "McFlurry Oreo", price: 15000 },
      { name: "Big Mac", price: 45000 },
    ]
  },
  {
    name: "Warteg Kharisma Bahari",
    address: "Babakan Raya",
    zone: "A",
    distanceKm: 0.5,
    menus: [
      { name: "Nasi Rames Telur", price: 15000 },
      { name: "Nasi Rames Ayam", price: 18000 },
      { name: "Es Teh Manis", price: 4000 },
    ]
  }
];

export async function GET() {
  try {
    await connectDB();
    await Merchant.deleteMany({});
    await Merchant.insertMany(MERCHANTS);
    return NextResponse.json({ message: "Seed success!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
