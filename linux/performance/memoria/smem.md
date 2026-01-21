<http://www.selenic.com/smem/>
<https://selenic.com/repo/smem/file/tip/smem>

Última versión: <https://selenic.com/repo/smem/raw-file/tip/smem>

Nos ayuda con los "problemas" con memoria compartida.

smem: smem is a tool that can give numerous reports on memory usage on Linux systems. Unlike existing tools, smem can report proportional set size (PSS), which is a more meaningful representation of the amount of memory used by libraries and applications in a virtual memory system.

smem  reports  physical  memory  usage,  taking shared memory pages into account.  Unshared memory is reported as the USS (Unique Set Size).  Shared memory is divided evenly among the processes sharing that memory.  The unshared memory (USS) plus a process's proportion of shared memory is reported as the  PSS  (Proportional Set Size).  The USS and PSS only include physical memory usage.  They do not include memory that has been swapped out to disk.

- Usa %Pss%smaps para dar una idea del consumo de RAM por proceso.

```bash
smem
 -k             # muestra unidades (K, M, etc)
 -p             # por proceso
 -m             # por mapping
 -u             # por usuario
 -w             # global del sistema
 --bar=pid      # grafico de barras
 --pie=pid      # grafico de tarta

  %USS          # unshared (no compartida)
  %PSS          # proportional: USS + (shared / nº proc. que comparten)
  %RSS          # total en RAM (shared + unshared)
```

mostrar los 10 procesos que más USS consumen, manteniendo el header y mostrando un total

```bash
sudo smem -kt | { sed -u 1q; tail -12; }
```

Ordenado por swap

```bash
sudo smem -kts swap | { sed -u 1q; tail -12; }
```

Para cada proceso del sistema, swap, uss, pss y rss

muestra un global al final

ordenado por USS (no compartida)

```bash
sudo smem -kt
```

Nos muestra totales de memoria usada de cada tipo

r=reverse, top consumidores arriba

solo para el usuario que lo ejecuta. Si queremos todo el sistema: sudo smem -rt

```bash
smem -rtk
```

consumo por usuario

```bash
sudo smem -uk
```
