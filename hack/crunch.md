http://sourceforge.net/projects/crunch-wordlist/

Para generar wordlists

Crunch is a wordlist generator where you can specify a standard character set or a character set you specify. crunch can generate all possible combinations and permutations.


# Instalar

## Arch
yaourt -S crunch


# Uso

crunch <min-len> <max-len> [<charset string>] [options]

En /usr/share/crunch/charset.lst tenemos distintos tipos de juegos de caracteres para elegir como formar nuestra wordlist

ualpha-numeric letras mayusculas y numeros

crunch 2 2 -f /usr/share/crunch/charset.lst ualpha-numeric > wordlist
Genera una lista de palabras de longitud 2 con caracteres A-Z0-9
