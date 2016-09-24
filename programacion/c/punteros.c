//https://es.wikibooks.org/wiki/Programaci%C3%B3n_en_C/Punteros
//
#include <stdio.h>

// p variable
// &p posicion de memoria de p
//
// int *puntero
// puntero, valor a donde "saltaremos"
// &puntero, posicion de memoria de puntero
// *p, valor que se encuentra en la posicion de memoria almacenada en puntero

int j, k;
int *ptr;

int main(void)
{
    j = 1;
    k = 2;
    ptr = &k; //ptr toma la posicion de memoria de k
    int *otra = &k; //equivalente a lo que hemos hecho con ptr
    printf("\n");
    printf("j has the value %d and is stored at %p\n", j, (void *)&j);
    printf("k has the value %d and is stored at %p\n", k, (void *)&k);
    printf("ptr has the value %p and is stored at %p\n", ptr, (void *)&ptr);
    printf("The value of the integer pointed to by ptr is %d\n", *ptr);

    return 0;
}

/*
 * Si en una función está definida como: func(char *)
 * nos está pidiendo que le pasemos la dirección de memoria de un char
 * char a;
 * func(&a);
 *
 * Podemos crear tambien punteros directamente, reservando un trozo de memoria para ellos
 * char *a = (char) malloc (sizeof (char));
 * func(a);
 * Aqui hemos reservado un trozo de memoria de tamaño char que es donde apunta a
 * En *a tendremos el valor del char que guardemos ahí.
*/

/*
 * Arrays
 * int x[10]={0,2,3,5];
 * x es un puntero que apunta a la dirección de memoria donde comienza el array
 * *x es el primer valor del array (0 en este caso)
*/

/*
 * Funciones
 * Si una función esta declarada como: char *func()
 * Para almacenar el valor retornado usaremos un puntero del mismo tipo
 * char *valor;
 * valor = func();
 * printf("%s\n", valor);
*/
