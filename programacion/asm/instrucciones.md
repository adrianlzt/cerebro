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
