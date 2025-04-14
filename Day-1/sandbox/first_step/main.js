import { add, diff, prod, quot } from "./math.js";

const a = 10;
const b = 5;

console.log(`Addition: ${a} + ${b} = ${add(a, b)}`);
console.log(`Subtraction: ${a} - ${b} = ${diff(a, b)}`);
console.log(`Multiplication: ${a} * ${b} = ${prod(a, b)}`);
console.log(`Division: ${a} / ${b} = ${quot(a, b)}`);