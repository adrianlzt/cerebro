// http://www.tutorialspoint.com/cprogramming/c_structures.htm
/*
 * Definir un tipo que contiene varios datos dentro.
 * Por ejemplo definir un struct Punto que tiene dentro
 * coordenada x, coordeanda y
 *
 * La definición se suelen meter en los headers file
 *
 * La forma básica de declarar un struct e instanciarlo:
 * struct punto {
 *   int x;
 *   int y;
 * };
 * struct punto centro = {1,2};
 * En c struct esta en un distinto namespace, por eso hace falta poner "struct" delante.
 * En c++ no hace falta.
 *
 * Pero para ahorrarnos tener que especificar siempre que es un struct se suele hacer:
 * typedef struct {
 *   int x;
 *   int y;
 * } punto;
 * punto centro = {1,2};
 * Si no definimos algún valor, se inicializará con 0.
 *
 * Para acceder o definir a un valor:
 * centro.x
 *
 * foo->bar is equivalent to (*foo).bar, i.e. it gets the member called bar from the struct that foo points to.
 *
 *
*/
#include <stdio.h>
#include <string.h>

struct Books
{
   char  title[50];
   char  author[50];
   char  subject[100];
   int   book_id;
};

int main( )
{
   struct Books Book1;        /* Declare Book1 of type Book */
   struct Books Book2;        /* Declare Book2 of type Book */

   /* book 1 specification */
   strcpy( Book1.title, "C Programming");
   /*
    * Otra forma de meter valores en el array char si no podemos usar strcpy
    * Book1.title[0] = 'C';
    * Book1.title[1] = ' ';
    * Book1.title[2] = 'P';
    * Book1.title[3] = '\0';
   */
   strcpy( Book1.author, "Nuha Ali");
   strcpy( Book1.subject, "C Programming Tutorial");
   Book1.book_id = 6495407;

   /* book 2 specification */
   strcpy( Book2.title, "Telecom Billing");
   strcpy( Book2.author, "Zara Ali");
   strcpy( Book2.subject, "Telecom Billing Tutorial");
   Book2.book_id = 6495700;

   /* print Book1 info */
   printf( "Book 1 title : %s\n", Book1.title);
   printf( "Book 1 author : %s\n", Book1.author);
   printf( "Book 1 subject : %s\n", Book1.subject);
   printf( "Book 1 book_id : %d\n", Book1.book_id);

   /* print Book2 info */
   printf( "Book 2 title : %s\n", Book2.title);
   printf( "Book 2 author : %s\n", Book2.author);
   printf( "Book 2 subject : %s\n", Book2.subject);
   printf( "Book 2 book_id : %d\n", Book2.book_id);

   /*
    * Almacenamiento en memoria:
    *  1.- los elementos se almacenarán en memoria en ordén.
    *      la dirección de memoria del primer elemento deberá ser menor que la del segundo
    *  2.- los procesadores hoy en dia requieren, o prefieren, que los types (tipos de variables) estén alineados en memoria, es decir, que su posición de memoria sea múltiplo de su tamaño
    */
   return 0;
}

