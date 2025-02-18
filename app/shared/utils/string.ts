export function toFixedIfNecessary(value: number, decimalPoint = 1) {
  return +value.toFixed(decimalPoint);
}
