for (var i=0;i<cars.length;i++) { 
  document.write(cars[i] + "<br>");
}


var txt="";
var person={fname:"John",lname:"Doe",age:25}; 
for (var x in person) {
  txt=txt + person[x];
}


while (i<5) {
  x=x + "The number is " + i + "<br>";
  i++;
}


do {
  x=x + "The number is " + i + "<br>";
  i++;
} while (i<5);


cars=["BMW","Volvo","Saab","Ford"];
var i=0;
while (cars[i]) {
  document.write(cars[i] + "<br>");
  i++;
}


Se puede usar 'break' o 'continue' en los bucles para saltar al siguiente paso o salir del bucle.
Usar 'return' en caso de forEach


# For con indice
var myArray = [123, 15, 187, 32];

myArray.forEach(function (value, i) {
    console.log('%d: %s', i, value);
});


{markers.map((marker, index) => {
  ...
)}



Under ECMAScript 5, you can combine Object.keys() and Array.prototype.forEach():

var obj = { first: "John", last: "Doe" };

Object.keys(obj).forEach(function(key) {
    console.log(key, obj[key]);
});



ES2016 adds for...of:

for (const key of Object.keys(obj)) {
    console.log(key, obj[key]);
}



ES2017 adds Object.entries() which avoids having to look up each value in the original object:

Object.entries(obj).forEach(
    ([key, value]) => console.log(key, value)
);
