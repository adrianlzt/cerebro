xbacklight -set [0-100]

alias brillo='xbacklight -set'



Meter en el /etc/rc.local para que se ponga al inicio


Otra forma
echo 100 | sudo tee /sys/class/backlight/intel_backlight/brightness
