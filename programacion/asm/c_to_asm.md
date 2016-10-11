gcc -S -o example1.s example1.c

# Stack
http://www.gghh.name/dibtp/2015/11/11/function-calls-in-c-practical-example.html

Cada frame nuevo se va poniendo más cerca del las posiciones de memoria más pequeñas (se suele decir: top of the stack)


# Variables locales
Se almacenan desde el rbp hacia posiciones de memorias menores
¿Como sabe el programa cuanto de "hacia arriba" puede ocupar?

Ejemplo:
movl    $0x399,-0x4(%rbp)



# Function calling
http://stackoverflow.com/questions/2535989/what-are-the-calling-conventions-for-unix-linux-system-calls-on-x86-64

x86_64 http://www.cs.tufts.edu/comp/40/readings/amd64-abi.pdf
Cuando llamamos a una función los parámetros se pasan en distintos registros:
%di -> primer parametro
%si -> segundo
%dx
%cx
%r8
%r9
Si hay más, se pasan por el stack (push X). Luego la función los recuperará con mov 0xNN(%rbp)

i386 http://www.sco.com/developers/devspecs/abi386-4.pdf
se pasan por el stack

Explicación de como funciona una llamada a una función.
Resumen: almacenamos donde tenemos que volver, el antiguo base pointer, y colocamos bp y sp en el siguiente hueco para seguir usando el stack
Para salir de la función, obtenemos el antiguo bp del stack (pop) y hacemos un reqt, que coge la addr de retorno del stack y hace un jmp

                                 preambulo funcion
main()     callq                 push bp; mov sp,bp
0 |          |                          |
  |          |                          |
  |          |                          |
  |          |                     BP,SP|
  |        SP|                          |BP old
SP|          |addr retorno              |addr retorno
  |          |                          |
  |          |                          |
  |          |                          |
BP|        BP|                          |




# Return value
AX, registro que se usa para retornar el valor



# Función tipica

Prólogo o preámbulo:
push   %rbp           Guardamos el base pointer que estabams usando para recuperarlo más tarde
mov    %rsp,%rbp      copiamos rsp en rbp, asi rbp apunta a la base del stack frame de esta función

Epílogo:
pop    %rbp           restauramos el base pointer de la función que llamó a esta
retq                  retornamos al frame anterior



# Print
Print cadena
printf("cosa")
mov    $0x4006d4,%edi
mov    $0x0,%eax
callq  0x400440 <printf@plt>

0x4006d4 es la posición de memoria donde se encuenta la cadena. Son bytes.
Para mostrar el contenido:
x/10bc 0x4006d4




https://www.recurse.com/blog/7-understanding-c-by-learning-assembly

%rbp and %rsp are special purpose registers. %rbp is the base pointer, which points to the base of the current stack frame, and %rsp is the stack pointer, which points to the top of the current stack frame. %rbp always has a higher value than %rsp because the stack starts at a high memory address and grows downwards.
The x86 calling convention dictates that a function’s return value is stored in %eax
The instruction pointer is a register that stores the memory address of the next instruction. On x86_64, that register is %rip. We can access the instruction pointer using the $rip variable, or alternatively we can use the architecture independent $pc
Even though the disassembly shows %eax as the destination, we print $rax, because GDB only sets up variables for full width registers.
Let’s try again, by casting %rax to a signed int: (gdb) p (int)$rax
