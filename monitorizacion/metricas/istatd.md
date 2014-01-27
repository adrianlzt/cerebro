https://github.com/imvu-open/istatd/wiki

The purpose of istatd is to efficiently collect, store and retrieve named statistics from a large number of sources. This is similar to Cacti, Graphite, Zabbix, and a bunch of other systems. In fact, istatd stated out as a storage back-end for Graphite, to replace the built-in carbon back-end. The specific goals of this system are:

  Support 100,000+ distinct counters with 3 different frequencies and retention ages, the shortest frequency being 10 seconds.
  Automatically creating new counter files for all new counters that samples are received for.
  Calculating statistics for each retention bucket -- minimum, maximum, average, standard deviation.

IMVU is using istatd in production, as the main graphing and data collecting mechanism for keeping a large, heterogenous server farm and application in order. Additionally, istatd provides quick feedback on code deployments using IMVUs "continuous deployment" process, where we test and deploy code to production up to fifty times a day.
