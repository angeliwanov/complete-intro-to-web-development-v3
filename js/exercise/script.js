// const timesToRepeat = 10;
// const character = "🍔";
// let result = "";
// for (let i = 0; i < timesToRepeat; i++) {
//   result += character;
// }

// console.log(result);

const A = "A";
let F;

function doStuff(B) {
  console.log(B); // works, B parameter is still in scope
  const C = "C";
  let H = "H";
  if (1 + 1 === 2) {
    const D = "D";
    H = "something else";
  }

  console.log(H); // works, H was declared outside the if statement
  F = "F";
}

let E = 0;
while (E < 3) {
  E++;
  console.log(A); // works, the outter block (called the global scope) is still in scope
  const G = "G";
}
console.log(E); // works, E was declared outside the whie loop

doStuff("B");

console.log(F); // works, F was declared in the global scope
