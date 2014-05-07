Un directorio por cpu

cpu0/index0
  level: tipo de cache (L1, L2 o L3)
  type: Data / Instruction / Unified
  size: tamaño
  shared_cpu_list: "0-1" compartida por cpu0 y cpu1
  shared_cpu_map: data con máscaras (la misma que shared_cpu_list)

/sys/devices/system/cpu/<CPU>/topology/   # topología CPU (nº cores)
  physical_package_id   # id de procesador
  core_id       # id de core dentro del procesador
