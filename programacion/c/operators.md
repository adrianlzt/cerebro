Son "left associative", dados dos operadores con la misma prioridad, se ejecutará de izquierda a derecha. Excepto los unary.

# Operadores matemáticos
+
-
*
/
%



# Relational operators
Menos precedencia que los operadores matematicos
>
<
<=
>=
==
!=



# Logical operators
Evaluados de izquierda a derecha.
La evaluación se para si tenemos ya la resolución
&& (mayor precedencia que ||)
||

cosa() && otra_cosa()
  si cosa() es false, otra_cosa() no se evalua



# Bitwise operators
&
|
^ exclusive or
>> left shift
<< right shift


# Unary operators
los más precedentes. Asociados de derecha a izquierda
! not
~ inverte todos los bits
++
--
-

a=1
b=a++
> b es 1

a=1
b=++a
> b es 2


# Assigment operators
=
+=
-=
*=
/=
%=
&= bitwise and
|= bitwise or
^= bitwise exclusive or
<<= bitwise left shift
>>= bitwise right shift
