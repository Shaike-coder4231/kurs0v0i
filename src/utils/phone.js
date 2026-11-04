export function formatPhone(value) {
  let digits = String(value).replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (digits && !digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  if (!digits) return '';
  let out = digits[0];
  const rest = digits.slice(1);
  if (rest.length > 0) out += '(' + rest.slice(0, 3);
  if (rest.length >= 4) out += ')' + rest.slice(3, 6);
  if (rest.length >= 7) out += '-' + rest.slice(6, 8);
  if (rest.length >= 9) out += '-' + rest.slice(8, 10);
  return out;
}