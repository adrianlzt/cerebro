- Informacion detallada de memoria por proceso (usada por 'ps' y 'top').
- El valor de %VmSize da poca información (es demasiado alto).
- Da información como si fuese el único proceso ejecutándose.

cat /proc/<PID>/status
  %FDSize       # tamaño de la tabla de descriptores del proceso
  %VmPeak       # peak virtual memory size (máximo alcanzado)
  %VmSize       # total program size (top%VIRT): valor incluye shared libs, pagefiles, paginas PROT_NONE no usadas...
  %VmLck        # memoria locked (siempre en RAM pero puede moverse)
  %VmPin        # memoria pinned (siempre en RAM y no puede moverse)
  %VmHWM        # máxima RAM usada (high watermark)
  %VmRSS        # uso de RAM (top%RSS)
  %VmData               # size of data segment
  %VmStk                # size of stack segment
  %VmExe                # size of text segment (code)
  %VmLib                # size of shared library code
  %VmPTE                # size of page table entries
  %VmSwap               # uso de swap
  %Mems_allowed         # mask of memory nodes allowed to this process
  %Mems_allowed_list    # same as previous, but in "list format"

