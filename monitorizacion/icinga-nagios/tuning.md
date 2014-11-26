https://laur.ie/blog/2014/02/why-ill-be-letting-nagios-live-on-a-bit-longer-thank-you-very-much/
http://docs.icinga.org/latest/en/tuning.html

use_large_installation_tweaks
We had to enable use_large_installation_tweaks  to get the latency down, but that made absolutely no difference to our Nagios operation. Our check latency is currently 2.324 seconds.
It’s literally a “go faster” flag.

Parte mala: it disable environnement_macros (all NAGIOS_ variables), and lot of notification scripts are using them (but should not…)


Disable CPU scaling
Our Nagios boxes are HP or Dell servers, that by default have a “dynamic” CPU scaling setting enabled. Great for power saving, but for some reason the intelligence built into this system is absolutely horrible with Nagios. Because Nagios has extremely high context switches, but relatively low CPU, it causes a lot of problems with the intelligent management. If you’re still having latency issues, set the server to “static high performance mode” or equivalent.


service_inter_check_delay_method=s
max_service_check_spread=30
esto es lo q t comentaba q hace icinga, espacia los checks cuando arranca para no lanzar muchos a la vez

y si quieres que procese mas rapido la cola check_results:
 check_result_reaper_frequency=1
