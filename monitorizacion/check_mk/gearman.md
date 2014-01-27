http://www.whiskey-tango-foxtrott.de/wiki/doku.php?id=nagios:check_mk-patches#gearman_patch

This patch provides another 'check_submission' option for check_mk. Instead of writing checks directly to the command pipe or into the checkresults directory, this patch allows you to write check_mk results to a gearman queue. So (precompiled) checks can be executed on remote/distributed Nagios workers.
