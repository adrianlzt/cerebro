Esquema general:

probe begin {
  printf("comienzo")
  ...
}

probe ... {
  if () { ... }
  ...
}

probe end {
  ...
  printf("end")
}


Se puede crear un fichero .meta con información sobre el programa.


probe syscall.exec* {
  printf("exec %s %s\n", execname(), argstr)
}

Ante cualquier llamada exec imprimimos su nombre y argumentos.



probe signal.send {
  if (sig.name == "SIGKILL")
    printf("%s was sent to %s (pid:%d) by %s uid:%d\n" sig_name, pid_name, sig_pud, execname(), uid())
}

Cuando se envie una señal de SIGKILL nos dice quien la está enviando.


También se pueden almacenar datos en un array, y después nos simplifica sacar datos estadísticos (max, min, mean, etc). También nos genera automáticamente el histograma.
https://access.redhat.com/site/documentation/en-US/Red_Hat_Enterprise_Linux/5/html-single/SystemTap_Language_Reference/#Statistics
global reads
probe netdev.receive {
  reads <<< length
}
probe end {
  print(@hist_linear(reads, 0, 10240, 200))
}
@hist_linear(VARIABLE, min, max, salto)


También tenemos foreach para recorrer arrays


kernel.function("schedule") -> entra cuando se llama a la función schedule
kernel.function("schedule").return -> entra cuando se sale de la función schedule
