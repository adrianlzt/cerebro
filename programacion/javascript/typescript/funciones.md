https://www.typescriptlang.org/docs/handbook/functions.html
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };


Valores por defecto:
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
