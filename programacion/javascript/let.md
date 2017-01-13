https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

let allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope.

let var1 [= value1] [, var2 [= value2]] [, ..., varN [= valueN]];


function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
