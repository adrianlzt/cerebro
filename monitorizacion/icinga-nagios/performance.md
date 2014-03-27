Si necesitamos ido2db.

  Icinga ---unix socket--- Ido2DB ----tcp socket----BBDD  <- MAL
  Icinga ---tcp socket---- Ido2DB ----unix socket---BBDD  <- BIEN
  Icinga ---unix socket--- Ido2DB ----unix socket---BBDD  <- LA MEJOR


Mirar tambien check_mk/performance.md


Con una muy buena máquina dedicada (no virtual, overhead de 20%):
  Quadcore CPU (Xeon E5640, Westmere-EP, 2.67-2.93GHz, 12MB Cache)
  32GB Ram

Con una mezcla de checks activos y pasivos, podemos pensar en
4000 hosts y 160.000 services (40 serv/host)
Este número sería para varios cores en la misma máquina.

Perfdata
Running the 4000/160.000 test we see a write IO of up to 70MB/s, a total of 13.5K IOPS which are merged to 300 IOPS by the OS kernel. This is on the upper end of what a standard server disk on a battery backed raid controller will handle, but still OK. CPU usage floated between 25% and 60%


https://laur.ie/blog/2014/02/why-ill-be-letting-nagios-live-on-a-bit-longer-thank-you-very-much/
ETSY
We “only” have 10,000 checks in our primary datacenter, all active, usually on 2-3 minute check intervals with a bunch on 30 seconds. I’m honestly not sure if that’s impressive or embarrassing, but the machine is 80% idle, so it’s not like there isn’t overhead for more. And this isn’t a super-duper spec box by any means. In fact, it’s actually one of the oldest servers we have.
