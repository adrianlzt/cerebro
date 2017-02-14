http://man7.org/linux/man-pages/man4/random.4.html
https://www.kernel.org/pub/linux/kernel/people/marcelo/linux-2.4/drivers/char/random.c
http://serverfault.com/questions/605275/some-questions-about-kernel-random-parameters

/proc/sys/kernel/random/entropy_avail
Numero de bits de entropia

/proc/sys/kernel/random/poolsize
Linux 2.4: tamaño del pool en bytes. Se puede escribir para poner alguno de los valores: 32, 64, 128, 256, 512, 1024, or 2048
Linux 2.6: tamaño en bits, 4096 bits

The file read_wakeup_threshold contains the number of bits of entropy required for waking up processes that sleep waiting for entropy from /dev/random. The default is 64

The file write_wakeup_threshold contains the number of bits of entropy below which we wake up processes that do a select(2) or poll(2) for write access to /dev/random. These values can be changed by writing to the files.
write-wakeup-threshold is rarely used
Despierta a dispositivos que quieran escribir en /dev/random para añadir entropia




Para máquinas físicas, en principio el demonio 'rngd' debería ser capaz de recopilar entropía de diversas fuentes. Sin embargo, para máquinas virtuales es necesario añadir a cada máquina virtual un dispositivo VirtIO RNG. De lo contrario, el demonio 'rngd' no arranca.



The random number generator gathers environmental noise from device drivers and other sources into an entropy pool. The generator also keeps an estimate of the number of bits of noise in the entropy pool. From this entropy pool random numbers are created.

/dev/random
nos devuelve entropía de alto valor.
Si el pool de entropia está vacío, lecturas de este device van a quedar bloqueadas hasta conseguir más ruido ambiental.
Si leemos del device con O_NONBLOCK, nos devolverá los bytes disponibles. Si no hubiese ninguno, devolverá -1, con errno=EAGAIN
Linux < 3.16, devuelve como máximo 340B
Linux >= 3.16, devuelve como máximo 215B

/dev/urandom
no bloquea lectura
En caso de no tener suficiente entropia, utilizará un generador de números pseudo aleatorio para producir los bytes requeridos.
En este caso los valores retornados son susceptibles de ataque, teóricamente.
As a general rule, /dev/urandom should be used for everything except long-lived GPG/SSL/SSH keys
Linux >= 3.16, devuelve como máximo 32MB


Escribir en cualquier de los devices va a incrementar el pool de entropía, pero no va a aumentar el contador de entropía.
Quiere decir que va a afectar a lo que se lea de los devices, pero no a incrementar la velocidad de lectura.

El generador de numeros aleatorios del kernel esta creado para producir poco material de alta calidad.
Realizar muchas lecturas de mucha cantidad de entropía puede tener impacto en otros usuarios usando el device




# Generar entropia
yum install rng-tools
rngd -r /dev/urandom


Medir cuanta entropia tenemos y como se va generando
http://1wt.eu/tools/readspeed/
http://serverfault.com/questions/214605/gpg-not-enough-entropy
