https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Bitwise_Operators

data.charCodeAt(i) & 0xff

El 0xff lo que hace es que solo nos quedemos con los dos últimos dígitos hexadecimales (es una máscara):
0xabc & 0xff -> 0xbc
