// http://www.tutorialspoint.com/cprogramming/c_quick_guide.htm
// argumentos 3
// imprime "The argument supplied is 3"

#include <stdio.h>

int main( int argc, char *argv[] )  
{
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
}
