https://www.systutorials.com/docs/linux/man/8-rtcwake/

Comando para despertar al ordenador pasado un tiempo.
El comando nos pone el ordenador en suspensión y lo restaura a la hora, o tiempo, que le digamos.

Poner en suspender y despertarse a la fecha especificada:
sudo rtcwake -m mem -t $(date -d "2018-10-25 01:23:08" +%s)
