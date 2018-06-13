https://wiki.archlinux.org/index.php/CPU_frequency_scaling

Desactivar el turbo
echo 1 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo


CPUFREQ
=======

/sys/devices/system/cpu/<CPU>/cpufreq/


scaling_governor
Governor seleccionado.


cpuinfo_cur_freq
Frecuencia actual de la CPU (RO).


scaling_max_freq
Limite superior de la policy (RW)



scaling_available_governors

Governors disponibles:
* performance
* powersave
* conservative
* ondemand
* userspace


scaling_min_freq
Limite inferior de la policy.


cpuinfo_min_freq
Minima frecuencia de trabajo de la cpu (RO).

