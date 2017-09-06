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
let cloned = Object.assign({}, source);

Con babel:
let cloned = { ... source };

