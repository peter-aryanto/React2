export function formatPrice(cents) {
  const output = (cents / 100).toLocaleString(
    // 'en-US',
    'en-AU',
    // { style: 'currency', currency: 'USD' }
    { style: 'currency', currency: 'AUD' }
  );
  return output;
}