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
