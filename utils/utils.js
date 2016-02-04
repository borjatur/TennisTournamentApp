export function divideArrayTwoEqualsParts(array) {
  var middle = Math.ceil(array.length/2);
  var dividedArray = [array.slice().splice(0,middle),array.slice().splice(middle,array.length-1)];
  return dividedArray;
}

export function isANumber(value) {
  return !(isNaN(value));
}

export function deleteElementOfArray(index,array) {
  if (array[index]) {
    array.splice(index,1);
  }
}

export function isPowerOfTwo(number) {
    return ((number & (number - 1)) == 0);
}

export function nearestPowerOfTwo(number) {
  number--;
   number |= number >> 1;
   number |= number >> 2;
   number |= number >> 4;
   number |= number >> 8;
   number |= number >> 16;
   number++;
   return number;
}

export function isEmpty(text) {
  return !text;
}
