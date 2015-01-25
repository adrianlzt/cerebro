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


Si vamos a tener muchos checks passivos mirar:
# EXTERNAL COMMAND BUFFER SLOTS
# This settings is used to tweak the number of items or "slots" that
# the Icinga daemon should allocate to the buffer that holds incoming
# external commands before they are processed.  As external commands
# are processed by the daemon, they are removed from the buffer.
# Increase the value, if you are using addons like check_mk supplying
# more external commands (passive check results) than usual.

#external_command_buffer_slots=32768
external_command_buffer_slots=32768



# HOST AND SERVICE CHECK REAPER FREQUENCY
# This is the frequency (in seconds!) that Icinga will process
# the results of host and service checks.
# Lower this value in larger environments to allow faster
# check result processing (requires more cpu power).

#check_result_reaper_frequency=1
check_result_reaper_frequency=1



# MAX CHECK RESULT REAPER TIME
# This is the max amount of time (in seconds) that  a single
# check result reaper event will be allowed to run before 
# returning control back to Icinga so it can perform other
# duties.

max_check_result_reaper_time=30



# MAX CHECK RESULT LIST ITEMS !!EXPERIMENTAL!!
# This experimental option allows you to set the max number of items
# the checkresult reaper will put onto the checkresult list for further
# processing by the core. If there are too many, the reaping will be
# terminated early, allowing the core to process the results sooner.
# On larger setups, that list might grow too much, and decrease
# performance on processing. You might experiment with that value, the
# inner core default is set to 0, disabling that feature.
# Values:
#  0 = Disable max check result list items
#  number = set max check result list items

#max_check_result_list_items=1024

