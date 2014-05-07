- Información en nº de páginas de 4k

cat /proc/<PID>/statm
  (1) %size      # VmSize%status
  (2) %resident  # VmRSS%status
  (3) %shared    # paginas shared (p.e mismo fichero mapeado
                 # por varios procesos)
  (4) %trs       # VmExe%status
  (5) %lrs       # 0
  (6) %drs       # VmData%status + VmStk%status
  (7) %dt        # 0

