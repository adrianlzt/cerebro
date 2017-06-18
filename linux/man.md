Escribir pagina man:
http://liw.fi/manpages/


Abrir un fichero como pagina man:
man -l nombre.3

man -a pagina
  leemos todas las man que matchean "pagina" (puede haber varias en distintas secciones

man -S 1,2,3 pagina
  solo abrir la man si está en una de esas secciones

man -K palabra
man -S 2 -K palabra
  buscar en todas las paginas man
  lento


Secciones
1 User Commands
2 System Calls
3 C Library Functions
4 Devices and Special Files
5 File Formats and Conventions
6 Games et. Al.
7 Miscellanea
8 System Administration tools and Deamons
