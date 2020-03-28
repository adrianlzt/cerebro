https://news.ycombinator.com/item?id=16598033
http://www.rexegg.com/regex-lookarounds.html

With lookarounds, your feet stay planted on the string. You're just looking, not moving!

(?=foo) Lookahead Asserts that what immediately follows the current position in the string is foo
(?<=foo)  Lookbehind  Asserts that what immediately precedes the current position in the string is foo
(?!foo) Negative Lookahead  Asserts that what immediately follows the current position in the string is not foo
(?<!foo)  Negative Lookbehind Asserts that what immediately precedes the current position in the string is not foo


(?=…)   Positive lookahead    (?=\d{10})\d{5}     01234 in 0123456789 (match solo el 01234 del segundo numero)
  Explicación: coge 5 caracteres cuando tenga una cadena de 10 caracteres (si la cadena es más larga podrá repetirse varias veces)

(?<=…)  Positive lookbehind   (?<=\d)cat          cat in 1cat
  Explicación: solo coge cat si tiene un numero delante

(?!…)   Negative lookahead    (?!theatre)the\w+   theme
  Explicación: busca una palabra que comience con "the" y que no se theatre
  Ejemplo: buscar todo menos ciertas exclusiones: https://regex101.com/r/rMbYHz/2

(?<!…)  Negative lookbehind   \w{3}(?<!mon)ster   Munster
  Explicacion: una palabra que empieze con tres letras, termine en "ster" y no sea "monster"


Ejemplo, miramos que tengamos una cadena de entre 4 y 22 caracteres y también, que tengamos 4 números en esa cadena:
\A(?=\w{4,22}\z)(?=.*[0-9].*[0-9].*[0-9].*[0-9].*)

Miramos que la cadena que buscamos sea cualquiera excepto unas determinadas:
https://regex101.com/r/PoX04f/1/

En python parece que no deja meter paréntesis dentro del lookahead
^(?!.* is not running as expected|Telegraf agent on {HOST.NAME} is unreachable for|Zabbix agent on {HOST.NAME} is unreachable for).*
Esto no hace match si la cadena comienza con alguno de esos casos.
