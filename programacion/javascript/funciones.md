Mirar arrow_functions.md


function test(s)
{
  return s;
}

var res = test("hola");



function test(s, e="default") {}

if(typeof e == "undefined") {
  console.log("e no definida");
}


Comprobar si una variable es una funcion
if (typeof variable === 'function') { }


Para devolver varios valores usar un array o un dict:

return [dCodes, dCodes2];

return {
    dCodes: dCodes,
    dCodes2: dCodes2
};


function cosa(a,b,c) {
  arguments[3]; //por si nos pasan una cuarta variable
  // Si no nos pasan 3 variables, estaran undefined



# Llamar a una funcion cuyo nombre esta en una variable
Clase[variable]()


# Usar objecto como parametros de una funcion
myFunction({ param1 : 70, param2 : 175});

function myFunction({param1, param2}={}){
  console.log("param1 " + param1);
}
