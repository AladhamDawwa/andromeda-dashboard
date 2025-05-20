export function calculateTotal(
  subtotal: number,
  services: number,
  taxes: number
) {
  const serviceFees = subtotal * services;
  const taxFees = subtotal * taxes;
  const total = subtotal + serviceFees + taxFees;
  return { serviceFees, taxFees, total };
}
