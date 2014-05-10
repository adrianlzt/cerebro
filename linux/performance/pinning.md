Asociar un proceso a un cpu y/o nodo numa en particular.

Se puede hacer con cgroups y con numactl (memoria/numa.md)


Si una aplicación tiene muchos cambios de contexto seguramente sea útil asociar ese proceso a una CPU. Evitaremos muchas invalidaciones de cache.
Asociar una app a una CPU suele ser una mejora, otra cosa es que nos podamos permitir hacer esto.
