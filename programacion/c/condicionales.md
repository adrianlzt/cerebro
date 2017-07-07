mirar operators.md

// si solo tenemos una linea tras el if se puede poner sin corchetes
if( argc == 2 )
  printf("hola");


if( argc == 2 )
{
   printf("The argument supplied is %s\n", argv[1]); // argv[0] es el nombre del programa
}
else if( argc > 2 )
{
   printf("Too many arguments supplied.\n");
}
else
{
   printf("One argument expected.\n");
}

