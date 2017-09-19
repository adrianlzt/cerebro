http://www.linuxinsight.com/proc_vmstat.html

- Muestra contadores de VM y estadisticas desde el ultimo arranque.

cat /proc/vmstat
  [...]
  %nr_dirty                     # paginas dirty (modificadas en RAM)
  %nr_writeback                 # paginas writeback (volviendo a disco)
  [...]
  %numa_hit        # al proceso se le asignó memoria del nodo que pidió.
  %numa_miss       # páginas reservadas en nodo local aunque el proceso
                   # las solicitó de un nodo remoto.
  %numa_foreign    # páginas reservadas en un nodo remoto aunque el
                   # proceso las solicitó del nodo local.
  %numa_interleave # páginas asignadas por interleaving (round-robin)
  %numa_local      # páginas reservadas en este nodo cuando el proceso
                   # estaba corriendo localmente.
  %numa_other      # páginas reservadas en este nodo cuando el proceso
                   # estaba corriendo en otro nodo.
  %pgpgin               # page-ins https://lists.gt.net/linux/kernel/1131720
  %pgpgout              # page-outs
  %pswpin               # swap-ins
  %pswpout              # swap-out
  %pgrefill_dma         # Page Refill (marcar pag. activas como inactivas)
  [...]
  %pgsteal_kswapd_dma   # Page Steals (liberar paginas no referenciadas)
  [...]
  pgscan_kswapd_dma     # Paginas escaneadas por kswapd
  [...]
  pgscan_direct_dma     # Paginas reclamadas directamente
  [...]
  pginodesteal          # Paginas reclamadas por inode-freeing
  [...]
  %kswapd_inodesteal    # Paginas reclamadas por kswapd por inode-freeing
  [...]
  %pageoutrun           # nº invocaciones a kswapd para page reclamation
  %numa_pte_updates             # NUMA
  [...]
  %compact_migrate_scanned      # Buddy y Compactacion
  [...]
  %unevictable_pgs_culled       # Unevictable LRU
  [...]
  %thp_fault_alloc              # Transparent HugePages
  [...]
  %nr_tlb_remote_flush          # TLB

