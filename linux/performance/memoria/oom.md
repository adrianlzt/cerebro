Para sistemas de escritorio tal vez queramos usar earlyoom, para matar procesos antes de llegar al límite del oom.

http://man7.org/linux/man-pages/man5/proc.5.html
http://lwn.net/Articles/317814/
https://linux-mm.org/OOM_Killer

Tunables para OOM:
vm.oom_dump_tasks, para hacer que haga un dump de todo el sistema en caso de que salga el OOM
vm.oom_kill_allocating_task, para matar un proceso que se considere, o el causante del oom
vm.panic_on_oom

Se encarga de matar procesos si se queda sin memoria. Empieza a matar procesos que considera poco importantes.
Cada proceso tendrá su propio /proc/PID/oom_score calculado heurísticamente (procesos más viejos más prioridad, procesos de root más prioridad, etc). Cuanto mayor número, mayor probabilidad de que sea matado
/proc/PID/oom_score_adj se usa para incrementar (más posibilidad de ser matado) o decrementar el score.
Los valores posibles van de -1000 (deshabilitar el oom killer en este proc) a +1000

/proc/PID/oom_adj está deprecated desde 2.6.36
En este los valores iban desde -17 (prohibido matarlo), hasta +15

oom_adj y oom_score_adj están entrelazados. Modificar uno afecta al otro.

Si las reservas de memoria siempre fuesen lícitas (no se dejase reservar más memoria de la que existe, vm.overcommit_memory = 2, never overcommit) nunca se ejecutaría el OOM killer (out of memory killer).
Pero lo normal es tener activado el over commit, de manera que se ofrece a las apps más memoria de la que realmente disponemos. Esto se hace porque se ha visto que las apps siempre reservan más memoria de la que realmente usan. El modo por defecto (0) va dando memoria excepto para peticiones excesivas.
Podemos ver la memoria "allocated" por todos los procesos en: cat /proc/meminfo | grep Committed_AS


Al saltar el oom tendremos una traza en dmesg y en la consola.
De las primeras lineas nos dirá quien ha ejecutado el oom killer y de las últimas tendremos que aplicación se ha matado (Killed process), con su score y la memoria que ocupaba.
Nos hará un dump del estado de la memoria antes de matar la aplicación.


Buscando la línea "Node n Normal" tendremos dos valores importantes: free, high y active_file.
En el caso de tener swappiness=0, solo se swapeara en caso de que free + active_file < high
  http://gitorious.ti.com/ti-linux-kernel/ti-linux-kernel/commit/fe35004fbf9eaf67482b074a2e032abb9c89b1dd?format=patch
  https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/commit/?id=8582cb96b0bfd6891766d8c30d759bf21aad3b4d


# Modificar el score para ser matado
choom -p 2047422
  consultar

sudo choom -p 2047422 -n 300
  modificar

Obtener los 10 procesos con mayor OOM score:
printf 'PID\t\tOOM Score\tOOM Score Adj\t\tCommand\n'; while read -r pid comm; do [ -f /proc/$pid/oom_score ] && [ $(cat /proc/$pid/oom_score) != 0 ] && printf '%d\t\t%d\t\t%d\t\t\t%s\n' "$pid" "$(cat /proc/$pid/oom_score)" "$(cat /proc/$pid/oom_score_adj)" "$comm"; done < <(ps -e -o pid= -o comm=) | sort -k 2nr | head -11


# Procesos matados por el OOM
dmesg | grep -i 'killed process'


# Llamar al oom killer manualmente
echo f > /proc/sysrq-trigger
echo f | sudo tee /proc/sysrq-trigger

No mata necesariamente algún proceso.
En el dmesg vemos:
[64099.487756] sysrq: Manual OOM execution
[64100.115794] Purging GPU memory, 45341 pages freed, 7587 pages still pinned, 20425 pages left available.


# Ejemplo de mensaje
https://stackoverflow.com/questions/9199731/understanding-the-linux-oom-killers-logs


[11686.040460] flasherav invoked oom-killer: gfp_mask=0x201da, order=0, oom_adj=0, oom_score_adj=0
[11686.040467] flasherav cpuset=/ mems_allowed=0
[11686.040472] Pid: 2859, comm: flasherav Not tainted 3.0.0-12-generic #20-Ubuntu
[11686.040476] Call Trace:
[11686.040488]  [<c10e1c15>] dump_header.isra.7+0x85/0xc0
[11686.040493]  [<c10e1e6c>] oom_kill_process+0x5c/0x80
[11686.040498]  [<c10e225f>] out_of_memory+0xbf/0x1d0
[11686.040503]  [<c10e6123>] __alloc_pages_nodemask+0x6c3/0x6e0
[11686.040509]  [<c10e78d3>] ? __do_page_cache_readahead+0xe3/0x170
[11686.040514]  [<c10e0fc8>] filemap_fault+0x218/0x390
[11686.040519]  [<c1001c24>] ? __switch_to+0x94/0x1a0
[11686.040525]  [<c10fb5ee>] __do_fault+0x3e/0x4b0
[11686.040530]  [<c1069971>] ? enqueue_hrtimer+0x21/0x80
[11686.040535]  [<c10fec2c>] handle_pte_fault+0xec/0x220
[11686.040540]  [<c10fee68>] handle_mm_fault+0x108/0x210
[11686.040546]  [<c152fa00>] ? vmalloc_fault+0xee/0xee
[11686.040551]  [<c152fb5b>] do_page_fault+0x15b/0x4a0
[11686.040555]  [<c1069a90>] ? update_rmtp+0x80/0x80
[11686.040560]  [<c106a7b6>] ? hrtimer_start_range_ns+0x26/0x30
[11686.040565]  [<c106aeaf>] ? sys_nanosleep+0x4f/0x60
[11686.040569]  [<c152fa00>] ? vmalloc_fault+0xee/0xee
[11686.040574]  [<c152cfcf>] error_code+0x67/0x6c
[11686.040580]  [<c1520000>] ? reserve_backup_gdb.isra.11+0x26d/0x2c0
[11686.040583] Mem-Info:
[11686.040585] DMA per-cpu:
[11686.040588] CPU    0: hi:    0, btch:   1 usd:   0
[11686.040592] CPU    1: hi:    0, btch:   1 usd:   0
[11686.040594] Normal per-cpu:
[11686.040597] CPU    0: hi:  186, btch:  31 usd:   5
[11686.040600] CPU    1: hi:  186, btch:  31 usd:  30
[11686.040603] HighMem per-cpu:
[11686.040605] CPU    0: hi:   42, btch:   7 usd:   7
[11686.040608] CPU    1: hi:   42, btch:   7 usd:  22
[11686.040613] active_anon:113150 inactive_anon:113378 isolated_anon:0
[11686.040615]  active_file:86 inactive_file:1964 isolated_file:0
[11686.040616]  unevictable:0 dirty:0 writeback:0 unstable:0
[11686.040618]  free:13274 slab_reclaimable:2239 slab_unreclaimable:2594
[11686.040619]  mapped:1387 shmem:4380 pagetables:1375 bounce:0
[11686.040627] DMA free:4776kB min:784kB low:980kB high:1176kB active_anon:5116kB inactive_anon:5472kB active_file:0kB inactive_file:0kB unevictable:0kB isolated(anon):0kB isolated(file):0kB present:15804kB mlocked:0kB dirty:0kB writeback:0kB mapped:0kB shmem:0kB slab_reclaimable:80kB slab_unreclaimable:168kB kernel_stack:96kB pagetables:64kB unstable:0kB bounce:0kB writeback_tmp:0kB pages_scanned:6 all_unreclaimable? yes
[11686.040634] lowmem_reserve[]: 0 865 1000 1000
[11686.040644] Normal free:48212kB min:44012kB low:55012kB high:66016kB active_anon:383196kB inactive_anon:383704kB active_file:344kB inactive_file:7884kB unevictable:0kB isolated(anon):0kB isolated(file):0kB present:885944kB mlocked:0kB dirty:0kB writeback:0kB mapped:5548kB shmem:17520kB slab_reclaimable:8876kB slab_unreclaimable:10208kB kernel_stack:1960kB pagetables:3976kB unstable:0kB bounce:0kB writeback_tmp:0kB pages_scanned:930 all_unreclaimable? yes
[11686.040652] lowmem_reserve[]: 0 0 1078 1078
[11686.040662] HighMem free:108kB min:132kB low:1844kB high:3560kB active_anon:64288kB inactive_anon:64336kB active_file:0kB inactive_file:0kB unevictable:0kB isolated(anon):0kB isolated(file):0kB present:138072kB mlocked:0kB dirty:0kB writeback:0kB mapped:0kB shmem:0kB slab_reclaimable:0kB slab_unreclaimable:0kB kernel_stack:0kB pagetables:1460kB unstable:0kB bounce:0kB writeback_tmp:0kB pages_scanned:61 all_unreclaimable? yes
[11686.040669] lowmem_reserve[]: 0 0 0 0
[11686.040675] DMA: 20*4kB 24*8kB 34*16kB 26*32kB 19*64kB 13*128kB 1*256kB 0*512kB 0*1024kB 0*2048kB 0*4096kB = 4784kB
[11686.040690] Normal: 819*4kB 607*8kB 357*16kB 176*32kB 99*64kB 49*128kB 23*256kB 4*512kB 0*1024kB 0*2048kB 2*4096kB = 48212kB
[11686.040704] HighMem: 16*4kB 0*8kB 1*16kB 0*32kB 0*64kB 0*128kB 0*256kB 0*512kB 0*1024kB 0*2048kB 0*4096kB = 80kB
[11686.040718] 14680 total pagecache pages
[11686.040721] 8202 pages in swap cache
[11686.040724] Swap cache stats: add 2191074, delete 2182872, find 1247325/1327415
[11686.040727] Free swap  = 0kB
[11686.040729] Total swap = 524284kB
[11686.043240] 262100 pages RAM
[11686.043244] 34790 pages HighMem
[11686.043246] 5610 pages reserved
[11686.043248] 2335 pages shared
[11686.043250] 240875 pages non-shared
[11686.043253] [ pid ]   uid  tgid total_vm      rss cpu oom_adj oom_score_adj name
[11686.043266] [ 1084]     0  1084      662        1   0       0             0 upstart-udev-br
[11686.043271] [ 1094]     0  1094      743       79   0     -17         -1000 udevd
[11686.043636] [ 2939]   999  2939     1814      406   0       0             0 bash
[11686.043641] Out of memory: Kill process 2603 (flasherav) score 761 or sacrifice child
[11686.043647] Killed process 2603 (flasherav) total-vm:1498536kB, anon-rss:721784kB, file-rss:4228kB
