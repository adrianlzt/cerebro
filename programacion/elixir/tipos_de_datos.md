# Atom
Atoms are constants whose values are their own name.
:hello


# Tuple
{1,2,3}

elem({1, 2, 3}, 0) #=> 1


# List
lists.md


# Binaries
<<1,2,3>>


Concatenar:
<<1,2,3>> <> <<4,5>>


# String
"hello"

"""
multiline
string
"""

Las strings se implementan como una binary

Concatenar:
"asda" <> "wqe"



# Char list
'hola'
Se implementa como una lista


?a
el número del ASCII integer que representa


Concatenar:
'asda' ++ 'wqe'



# Ranges
1..10
  del 1 al 10, ambos incluídos

Ver si un número pertenece a un rango:
Enum.member?(1..10, 23)

Enum.member?(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"], passport["ecl"])

first..last = 1..8
  first=1, last=8



# Maps
mirar maps.md
