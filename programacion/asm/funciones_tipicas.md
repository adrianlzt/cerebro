push -> meter a la pila
pop -> sacar de la pila


Función tipica:
push   %rbp           Guardamos el base pointer que estabams usando para recuperarlo más tarde
mov    %rsp,%rbp      copiamos rsp en rbp, asi rbp apunta a la base del stack frame de esta función
...
pop    %rbp           restauramos el base pointer de la función que llamó a esta
retq                  retornamos al frame anterior



Al hacer pop estamos copiando el valor de:
x/1xg $sp  (para 64 bits)
a la variable que ponga el pop


Si tenemos que retornar un valor se usa el registro eax



Print cadena
printf("cosa")
mov    $0x4006d4,%edi
mov    $0x0,%eax
callq  0x400440 <printf@plt>

0x4006d4 es la posición de memoria donde se encuenta la cadena. Son bytes.
Para mostrar el contenido:
x/10bc 0x4006d4

