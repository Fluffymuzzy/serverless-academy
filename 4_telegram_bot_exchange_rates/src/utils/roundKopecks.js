//  Round a number to the nearest kopeck value
export function roundKopecks(number) {
  return Math.round(number * 100) / 100;
}


