Información detallada de cada zona de memoria:

Parte de la info la comparten con "maps" (mirar maps.md)

cat /proc/<PID>/smaps
  %Size:                  # tamaño total (destino-origen)
  [...]
  %Pss:                   # PSS (proportional share size): tamaño
                          # dividido por nº de procesos que usan
                          # esa zona.
  [...]
  %KernelPageSize:        # 4K
  %MMUPageSize:           # pagesize para MMU
                          # (casi siempre = KernelPageSize)
  VmFlags


# pmap
Herramienta que nos saca esa información de forma más sencilla y más fácilmente parseable.
