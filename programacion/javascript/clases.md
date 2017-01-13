https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
Para ecma5 y anterior mirar abajo

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}

// Debe estar definida la clase antes de llamarla (hoisting)
var p = new Polygon();

console.log(p.area);


// Definir y crear el objeto al mismo tiempo
var Polygon = class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};




Se pueden crear clases "anónimas" (class expressions)
// unnamed
var Polygon = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};



// Static
// Se pueden usar sin crear (sin instanciar) el objeto
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);
  }
}
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));




// Extends / Herencia
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();



# Antiguo (<= ecma5)
Cosas raras con prototype
