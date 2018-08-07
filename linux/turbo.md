https://askubuntu.com/questions/619875/disabling-intel-turbo-boost-in-ubuntu

Deshabilitar el turbo
echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo

Comprobar estado del turbo
cat /sys/devices/system/cpu/intel_pstate/no_turbo
