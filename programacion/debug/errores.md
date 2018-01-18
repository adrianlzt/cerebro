value has been optimized out
Quitar optimización al compilar: -O0


Attempt to dereference a generic pointer.
Si al hacer un print nos devuelve este error tendremos que hacer cast al tipo de puntero que es. Ej.:
(gdb) p ((contact*) ds.contact_ptr).email
  convertimos ds.contact_ptr al struct "contact" y luego extraemos el campo email.


can't compute CFA for this frame
No se como arreglarlo, no he mirado mucho, aunque tampoco hay mucha info.
Bug de GCC?



warning: Error disabling address space randomization: Operation not permitted
con ese error no podemos poner breakpoints
visto al correr gdb en un container. Correr con --privileged (docker)
