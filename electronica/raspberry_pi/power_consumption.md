https://www.pidramble.com/wiki/benchmarks/power-consumption

# Zero 2 W
HDMI off, LED off	            100 mA (0.6 W)
HDMI off, LED off, wifi         120 mA (0.7 W)

Midiendo con un power meter el cargador de movil del samsung s7:
Con los leds encendidos y la wifi, sin mucha carga: 1.2 - 1.3W
Con los leds encendidos, sin wifi, sin mucha carga: 1.0 - 1.1W


Para reducir el consumo:

https://www.jeffgeerling.com/blogs/jeff-geerling/raspberry-pi-zero-conserve-energy



# Pi 4 B
Idle	                        540 mA (2.7 W)
ab -n 100 -c 10 (uncached)	    1010 mA (5.1 W)
