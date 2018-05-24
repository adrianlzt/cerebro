Ambito: http://www.perlmonks.org/?node_id=559011

my proporciona ámbito léxico; una variable declarada con my sólo es visible en el bloque en que ha sido declarada.

Los bloques de código son trozos delimitados por llaves { }. Un archivo también se considera un bloque.

Usar use vars qw([nombres de variables]) o our ([nombres de variables]) para crear globales.

local guarda el valor de una global y lo sustituye por un valor nuevo a efectos del código que está en el bloque actual y al que llamemos desde tal bloque.



# Boolean
http://stackoverflow.com/questions/1036347/how-do-i-use-boolean-variables-in-perl

No hay false o true.

False es 0, '0', undef, '', () o ('')

True el resto


# Tipo de variable
ref($var);

Si me dice HASH puede ser un objecto


$x is always a scalar. The hint is the sigil $: any variable (or dereferencing of some other type) starting with $ is a scalar. (See perldoc perldata for more about data types.)
