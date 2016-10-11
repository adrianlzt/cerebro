https://msdn.microsoft.com/en-us/library/ff561504(v=vs.85).aspx
https://msdn.microsoft.com/en-us/library/ff561500(v=vs.85).aspx
  solo las diferencias que hay entre 32 y 64

http://ref.x86asm.net/geek64-abc.html


http://www.cs.virginia.edu/~evans/cs216/guides/x86.html
lea — Load effective address
  carga la direccion de memoria de la variable del segundo operando en la variable del primer operando
  lea    0x10(%rsp),%rdi
    carga la dirección de memoria de rdi en la pila (rsp) desplazada

  Suele usarse para cargar el principio de un array
  También nos permite:
    perform addition with either two or three operands, and
    store the result in any register; not just one of the source operands.


push -> meter a la pila. Equivalente a:
                                        sub  $8,%rsp        # subtract 8 from rsp
                                        mov  reg,(%rsp)     # store, using rsp as the address
pop -> sacar de la pila. Equivalente a:
                                        mov  (%rsp),reg     # load, using rsp as the address
                                        add  $8,%rsp        # add 8 to the rsp

callq -> hacer una llamda a una función. Equivalente a:
                                                        push return_address
                                                        jmp call_address


Al hacer pop estamos copiando el valor de:
x/1xg $sp  (para 64 bits)
a la variable que ponga el pop


TEST %eax, %eax
JE   400e77 <phase_1+0x23>
jumps if the %eax is zero.

jnz (jump if not zero)


JE [Jump if Equals] tests the zero flag and jumps if the flag is set. JE is an alias of JZ [Jump if Zero]
