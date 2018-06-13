https://unix.stackexchange.com/questions/132192/running-application-ends-with-segmentation-fault?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

Se produce porque la app intenta acceder a una región de memoria que no le pertenece.
El kernel le envía la señal SIGSEGV para matarla.

Para obtener el stack trace de una aplicación que falla con "Segmentation fault"
gdb programa
> run
Aqui veremos quien causa el fallo
Para ver el backtrace:
> bt
