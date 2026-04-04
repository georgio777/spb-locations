const getMaxMinCoords = (arr: number[]): number[] => {  
  let max = arr[0];
  let min = arr[0];
  arr.forEach(num => {
      if (num > max) max = num;
      if (num < min) min = num;
  });
  return [max, min];
};

export default getMaxMinCoords;