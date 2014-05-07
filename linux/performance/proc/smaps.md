- Información detallada de cada zona de memoria:

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

