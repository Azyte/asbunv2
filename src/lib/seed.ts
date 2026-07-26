import mongoose from 'mongoose';
import { Merchant } from './models';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

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

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }
  
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  await Merchant.deleteMany({});
  console.log('Cleared existing merchants');

  await Merchant.insertMany(MERCHANTS);
  console.log('Inserted seed data');

  mongoose.disconnect();
  process.exit(0);
}

seed();
