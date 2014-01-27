http://www.tutorialspoint.com/perl/perl_arrays.htm

Crear arrays:
@ages = (25, 30, 40);             
@names = ("John Paul", "Lisa", "Kumar");

$array[0] = 2
$array[1] = 4

@var_10 = (1..10);
@var_20 = (10..20);
@var_abc = (a..z);


Acceso a arrays:
$ages[0] -> 25
$ages[-1] -> 40

@days[3,4,5]

print "@var_10"

Tamaño: scalar(@array)
Indice mayor: $#array


push @ARRAY, LIST
Pushes the values of the list onto the end of the array.

pop @ARRAY
Pops off and returns the last value of the array.

shift @ARRAY
Shifts the first value of the array off and returns it, shortening the array by 1 and moving everything down

unshift @ARRAY, LIST
Prepends list to the front of the array, and returns the number of elements in the new array.



String -> array
$var_names = "Larry,David,Roger,Ken,Michael,Tom";
@names  = split(',', $var_names);

Array -> string
$string2 = join( ',', @names );
