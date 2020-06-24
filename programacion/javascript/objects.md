http://www.w3schools.com/js/js_objects.asp

var car = {type:"Fiat", model:"500", color:"white"};
console.log(car['type']);

var nombre = "pepe"
var obj = {}


obj.hasOwnProperty("cosa")
  nos devuele true si tiene ese elemento

# Merge
> Object.assign({"uno":1},{"dos":2});
{ uno: 1, dos: 2 }

# Comprobar que es un object
if (typeof x === 'object') { console.log("es objeto"); }

# Obtener todos sus variables
Object.getOwnPropertyNames(objeto)


# Obtener sus metodos
var methods = [];
for (var m in obj) {
  if (typeof obj[m] == "function") {
    methods.push(m);
  }
}
alert(methods.join(","));


# Copiar objecto (en vez de pasar referencia)
https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
let cloned = Object.assign({}, source);  // forma antigua
let cloned = { ... source };



# Ver si es un objeto
typeof a === "object"


Iterar:
ES2017 adds Object.entries() which avoids having to look up each value in the original object:

Object.entries(obj).forEach(
    ([key, value]) => console.log(key, value)
);
