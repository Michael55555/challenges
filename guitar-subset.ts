let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort();
let g = 15;
let matches: any[];
matches = subset(array);
matches = matches.concat(subset(array.reverse()))
function subset(s:Array<number>) {
  let match = [];
  for (let h = 0; h < s.length; h++) {
    let i = s[h];
    let sum = i;
    let arr = [];
    arr.push(i);
    for (let k = h + 1; k < s.length; k++) {
      let j = s[k];
      arr.push(j);
      sum += j;
      if (sum === g) {
        console.log(i + ',' + j + ',' + sum);
        match.push(arr);
        break;
      } else if (sum >= g) {
        break;
      }
      console.log(JSON.stringify(arr));
      console.log('sum: ' + sum);
    }
    arr = []
    sum = 0;
    for (let k = h + 1; k < s.length; k++) {
      let j = s[k];
      arr.push(i);
      arr.push(j);
      sum = i + j;
      if (sum === g) {
        console.log(i + ',' + j + ',' + sum);
        match.push(arr);
        break;
      } else if (sum > g) {
        break;
      }
      console.log(JSON.stringify(arr));
      console.log('sum: ' + sum);
      arr = [];
    }
  }
  return match;
}

function dedupe(arr:Array<number>) {
  const hashTable:any = {}

  return arr.filter(function (el) {
    const key = JSON.stringify(el)
    const match = Boolean(hashTable[key])

    return (match ? false : hashTable[key] = true)
  });
}

matches = dedupe(matches);
console.log(JSON.stringify(matches));