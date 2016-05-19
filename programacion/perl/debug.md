perl -d programa.pl


h: help
v: lineas alrededor de la ejecución
l: list
l 20,30: mostrar de la linea 20 a la 30
.: mostar linea actual
s: step
n: next (sin meterse en funciones)
x expr: evaluar expresion
p expr: imprimir expresion
p: imprime lo ultimo?
b linea: breakpoint en linea
B linea: borrar breakpoint
B: borrar todos los breakpoints
c: continue



# Dumper
use Data::Dumper;
print Dumper $var;


# Soporte readline
Para poder usar el historial de comandos
http://www.perlmonks.org/?node_id=838813

Install Term::ReadLine::Perl from CPAN.

