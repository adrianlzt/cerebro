sysdig proc.name=nombre

El return code lo saca al final
> procexit status=2560

El valor que saca es RC*256


sysdig -A -s 300 proc.name=a.out and \( evt.type=procexit or evt.type=execve \)
  ver llamada de ejecucción y valor de retorno


sysdig -A -s 1200 proc.name=httpd and \( evt.type=procexit or evt.type=execve \) -p "%evt.time %evt.dir %proc.cmdline (%evt.args)"
  sacar la linea ejecutada y el valor retornado
