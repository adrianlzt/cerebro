https://www.slideshare.net/brendangregg/container-performance-analysis

mirar stats.md



nsenter -t PID -u hostname
obtener el hostname del container al que pertenece ese PID

nsenter -t PID -m -p top
correr top en el container de pid PID
