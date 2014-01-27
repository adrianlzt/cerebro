Imprimir imagen con cuantos sucesos por segundo ocurren en un log:


/var/log/syslog
Oct  7 01:00:36 adrian-Presario anacron[15891]: Job `cron.daily' terminated (exit status: 1) (mailing output)
Oct  7 01:00:36 adrian-Presario anacron[15891]: Job `cron.weekly' started


cat syslog | cut -d' ' -f1-4 | xargs -L1 -i$ date +%s -d$ | uniq -c  > /tmp/plot
gnuplot
gnuplot> plot '/tmp/plot' using 2:1 with lines
