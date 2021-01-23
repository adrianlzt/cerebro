# Pre HPUX 11i v2
pvlinks

# Post HPUX 11i v2
scsimgr lun_map
  visto en https://github.com/tribe29/checkmk/blob/4d44e245af3c4c3ede735409ad5d1e77d7fec39d/agents/plugins/hpux_lunstats#L29

scsimgr -p lun_map -D /dev/rdisk/disk14
  paths de un lun seleccionado por el path de su disco, en formato scriptable (-p)

Obtener la lista de LUNs (su disk path):
scsimgr lun_map | grep "LUN PATH INFORMATION FOR LUN" | cut -d ':' -f 2 | tr -d ' ' | sort
