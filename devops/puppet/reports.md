http://docs.puppetlabs.com/guides/reporting.html


En /var/lib/puppet/state/last_run_report.yaml tenemos el log de la última ejecucción de puppet agent.



Limpiar reports del puppet master:

Todos menos los dos más recientes de cada nodo:
cd /var/lib/puppet/reports
for i in `ls`; do cd $i; ls -1t | tail -n +3 | xargs rm  ; cd ..; done

Más antiguos de 7 días:
find /var/lib/puppet/reports/ -type f -ctime +7 | xargs -P 4 -n 20 rm -f
