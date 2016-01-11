https://github.com/adrianlzt/nfsiostat-grapher

http://www.admin-magazine.com/HPC/Articles/Monitoring-NFS-Storage-with-nfsiostat

Como el iostat pero para nfs.
Para ejecutar en el cliente.

cat /proc/self/mountstats
mirar tambien mountstats.md


nfsiostat 5
  muestra estadísticas cada 5 segundos
  The first report contains statistics for the time since each file system was mounted.
  Each subsequent report contains statistics collected during the interval since the previous report.

# Version nfs-utils que saca en yaml
https://gist.githubusercontent.com/anonymous/f23aa5503af51ce1abae/raw/8afba4b0afcc50e02823a43f9a55ee185e2bb98a/nfsiostat

# Version nfs-utils
/usr/sbin/nfsiostat
http://git.linux-nfs.org/?p=steved/nfs-utils.git;a=blob;f=tools/nfs-iostat/nfs-iostat.py;h=61d15a540e4f1c2c9d250d1f1956520e52af3213;hb=HEAD

wget "http://git.linux-nfs.org/?p=steved/nfs-utils.git;a=blob_plain;f=tools/nfs-iostat/nfs-iostat.py;h=61d15a540e4f1c2c9d250d1f1956520e52af3213;hb=HEAD" -O nfsiostat
Es un python

-a or --attr
displays statistics related to the attribute cache

-d or --dir
displays statistics related to directory operations

-p or --page
displays statistics related to the page cache


# Version systat - DEPRECATED
https://github.com/sysstat/sysstat/commit/c9e9693d960836e0f059ab6d358af5edcc6fea65
http://sebastien.godard.pagesperso-orange.fr/man_nfsiostat.html

Script para generar graficas:
https://dl.dropboxusercontent.com/u/1813720/nfsiostat_plotter.py
En este dir
No me funciona.
Mirar:
https://clusterbuffer.wordpress.com/2014/02/23/iostat-plotter-and-nfsiostat-plotter-updates-v3/
https://clusterbuffer.wordpress.com/file-system-tools/nfsiostat_plotter/nfsiostat-plotter-v3/
https://clusterbuffer.wordpress.com/file-system-tools/nfsiostat_plotter/nfsiostat-plotter-v4/

Falla porque la salida tiene varios file systems
Borrar del iozone_r_nfsiostat.out para dejar solo un FS.
Puesto comentario en la web de que no esta haciendo bien eso.

Mirar como se hace para meter también la info de la cpu.
