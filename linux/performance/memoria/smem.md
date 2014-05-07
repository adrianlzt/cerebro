Nos ayuda con los "problemas" con memoria compartida.

- Usa %Pss%smaps para dar una idea del consumo de RAM por proceso.

smem
 -p             # por proceso
 -m             # por mapping
 -u             # por usuario
 -w             # global del sistema
 --bar=pid      # grafico de barras
 --pie=pid      # grafico de tarta


  %USS          # unshared (no compartida)
  %PSS          # proportional: USS + (shared / nº proc. que comparten)
  %RSS          # total en RAM (shared + unshared)

