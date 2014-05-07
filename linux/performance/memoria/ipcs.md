http://en.wikipedia.org/wiki/Shared_memory

Muestra información sobre memoria compartida

ipcs        # segmentos de memoria compartida, semaforos y colas
  -u          # resumen
  -m -p       # detalle de memoria compartida por SHMID
    %cpid       # PID creador
    %lpid       # PID ultimo acceso
  -m -i SHMID   # detalle por segmento de memoria compartida SHMID
