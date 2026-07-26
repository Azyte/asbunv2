import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  room: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  rating: { type: Number, default: 5.0 },
  balance: { type: Number, default: 0 },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);

const merchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  zone: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  image: { type: String },
  menus: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  }]
}, { timestamps: true });

export const Merchant = mongoose.models.Merchant || mongoose.model('Merchant', merchantSchema);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  notes: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'buying', 'delivering', 'completed', 'cancelled'], default: 'pending' },
  jastiperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodTotal: { type: Number, required: true },
  fee: { type: Number, required: true },
  platformFee: { type: Number, default: 2000 },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

const marketplaceSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  condition: { type: String },
  image: { type: String },
  status: { type: String, enum: ['available', 'sold'], default: 'available' }
}, { timestamps: true });

export const Marketplace = mongoose.models.Marketplace || mongoose.model('Marketplace', marketplaceSchema);

const borrowSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemName: { type: String, required: true },
  status: { type: String, enum: ['available', 'borrowed'], default: 'available' },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Borrow = mongoose.models.Borrow || mongoose.model('Borrow', borrowSchema);

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true }, // e.g. "Gopay", "BCA"
  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export const Withdrawal = mongoose.models.Withdrawal || mongoose.model('Withdrawal', withdrawalSchema);

const topupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  proof: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export const Topup = mongoose.models.Topup || mongoose.model('Topup', topupSchema);
