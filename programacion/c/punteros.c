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
    printf("\n");
    printf("j has the value %d and is stored at %p\n", j, (void *)&j);
    printf("k has the value %d and is stored at %p\n", k, (void *)&k);
    printf("ptr has the value %p and is stored at %p\n", ptr, (void *)&ptr);
    printf("The value of the integer pointed to by ptr is %d\n", *ptr);

    return 0;
}
