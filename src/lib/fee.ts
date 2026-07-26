export function getZoneFee(distanceKm: number): number {
  if (distanceKm <= 2) return 5000;
  if (distanceKm <= 4) return 7000;
  if (distanceKm <= 6) return 10000;
  return 12000;
}

export function getItemSurcharge(itemCount: number, hasHeavy = false): number {
  let surcharge = 0;
  if (itemCount >= 4 && itemCount <= 6) surcharge += 1000;
  else if (itemCount >= 7) surcharge += 2000;
  if (hasHeavy) surcharge += 3000;
  return surcharge;
}

export function getZoneLabel(distanceKm: number): string {
  if (distanceKm <= 2) return 'A';
  if (distanceKm <= 4) return 'B';
  if (distanceKm <= 6) return 'C';
  return 'D';
}

export const PLATFORM_FEE = 2000;

export function calculateTotal(foodTotal: number, distanceKm: number, itemCount: number, hasHeavy = false) {
  const fee = getZoneFee(distanceKm) + getItemSurcharge(itemCount, hasHeavy);
  const totalPrice = foodTotal + fee + PLATFORM_FEE;
  return { foodTotal, fee, platformFee: PLATFORM_FEE, totalPrice };
}

export function formatRupiah(n: number): string {
  return 'Rp' + n.toLocaleString('id-ID');
}
