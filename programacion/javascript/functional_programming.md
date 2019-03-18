# map
> a=[1,2,3]
[ 1, 2, 3 ]
> a.map(function(x) { return "h";})
[ 'h', 'h', 'h' ]


[1,2,3].map(x => console.log(x))


# reduce
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce
[0,1,2,3,4].reduce(function(valorAnteriorRetornado, valorActual, indice, vector){
  return valorAnterior + valorActual;
});


# filter
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
