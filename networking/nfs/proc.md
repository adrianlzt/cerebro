Info en /proc/self/mountstats
Escrito en python


# Ultima version
http://git.linux-nfs.org/?p=steved/nfs-utils.git;a=blob;f=tools/mountstats/mountstats.py;h=011bb426c1567b90a1302c25e20617d57099f5d3;hb=HEAD

wget "http://git.linux-nfs.org/?p=steved/nfs-utils.git;a=blob_plain;f=tools/mountstats/mountstats.py;h=011bb426c1567b90a1302c25e20617d57099f5d3;hb=HEAD" -O mountstats

Tres comandos:
mountstats          Display a combination of per-op RPC statistics, NFS event counts, and NFS byte counts. (default)
nfsstat             Display nfsstat-like statistics.
iostat              Display iostat-like statistics.

./mountstats nfsstat
  nos da el número de cada tipo de operación y el porcentaje sobre el total

./mountstats iostat
  es lo mismo que el nfsiostat
  nos da una salida como iostat, con velocidades (ops/s, kB/s, etc). Nos deja ejecutarlo durante N veces cada T tiempo.


# Comparar estadísticas
Parece que vale para los tres comandos.
Si queremos comparar las estadísticas respecto a un instante determinado:
cp /proc/self/mountstats mountstats_$(date +%Y%m%d%H%M%S)

./mountstats /srv/nagios -S mountstats_*



# /proc/net/rpc/nfs
# /proc/net/rpc/nfsd
http://deepdivetech.blogspot.com.es/2012/01/nfs-procnetrpcnfsd-file-explained.html

http://forums.cacti.net/about24790.html

proc3 -> NFSv3
proc4 -> NFSv4
