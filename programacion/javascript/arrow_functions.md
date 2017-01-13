https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

Para crear funciones anónimas más compactas


Sintaxis básica:
(param1, param2, …, paramN) => { statements }

(param1, param2, …, paramN) => expression
equivalent to: (param1, param2, …, paramN) => { return expression; }


Si solo tenemos un parámetro no hace falta poner paréntesis:
singleParam => { statements }

Si no tenemos ningún parámetro, tenemos que poner paréntesis.

Se pueden usar parametros con valores por defecto y "rest":
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
(param1, param2, ...rest) => { statements }


# Ejemplos
function(s){ return s.length }

Con arrow function se escribiría:
s => s.length
