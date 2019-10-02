https://github.com/toml-lang/toml

TOML<->JSON online: https://toolkit.site/format.html
Otros que he visto no funcionan correctamente con los arrays de tables.

TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.

Lenguaje para usarse en ficheros de configuración.

Los espacios en blanco/tabs son opcionales


# Números
Válido, se usa "_" como separador visual
a = 1_000
b = 1000
c = 1_123_321

# String
## Multiline
str = """cadena
con varias lineas
"""
Si terminamos la linea con "\" se eliminarán los newlines y white spaces hasta el siguiente caracter.

## Literal strings
Para cadenas con caracteres raros. Se almacen tal cual
winpath2 = '\\ServerX\admin$\system32\'

También pueden ser multiline, con '''


# Bool
true / false



# Arrays
https://github.com/toml-lang/toml#array

Un array debe contener elementos del mismo tipo (no mezclar int con double, o string con int)
Si podemos meter arrays distintos dentro de arrays: [ [ 1, 2 ], ["a", "b", "c"] ]

Podemos dejar un trailing comma en un array multilinea:
array1 = [
  1,
  2,
]



# Tables (hash table / dictionaries)
[table]
  key1 = "val1"

[foo.bar]
key = 2

En JSON sería: {"foo": { "bar": { "key": 2 } } }

Inline tables:
name = { first = "Tom", last = "Preston-Werner" }


No se puede declarar dos veces la misma tabla.



# Array of tables/dicts
https://github.com/toml-lang/toml#array-of-tables

Diferencia entre table y array of tables:
[products] -> "products": {}
[[products]] -> "products": [{}]


[[products]]
name = "Hammer"
sku = 738594937

[[products]]

[[products]]
name = "Nail"
sku = 284758393
color = "gray"


En JSON seria:
{
  "products": [
    { "name": "Hammer", "sku": 738594937 },
    { },
    { "name": "Nail", "sku": 284758393, "color": "gray" }
  ]
}
