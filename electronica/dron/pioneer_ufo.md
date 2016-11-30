# Información para intentar controlarlo desde el pc
https://www.rcgroups.com/forums/showthread.php?t=2547951&page=10
https://www.reddit.com/r/HowToHack/comments/4512il/how_to_hack_ip_camera_in_toy_drone/
https://github.com/FREEZX/fq777-954-chrome-app

Dron+OpenCV: https://www.youtube.com/watch?v=C95bngCOv9Q
Reconocer algo en un video, pero una vez tenemos el video: http://www.pyimagesearch.com/2015/05/04/target-acquired-finding-targets-in-drone-and-quadcopter-video-streams-using-python-and-opencv/
http://blog.christianperone.com/2015/01/real-time-drone-object-tracking-using-python-and-opencv/

The big limitation is that the phone app must also be running. The drone won't listen to my commands unless it is streaming video to the phone. I'm starting to run out of ideas to get the video working and may have to give up if my pending leads don't pan out.

IP del drone en su WIFI: 172.16.10.1

El video va por TCP 8888

Comandos para manejarlo: UDP 8895

Filtro wireshark para solo ver los comandos
udp.dstport == 8895


66 LL AA TT RR SS KK 99
LL: avance lateral
AA: avanzar
TT: subir/bajar
RR: girar
SS: estado
KK: checksum

Comando cuando no esta arrancado
66 7f 80 80 80 00 ff 99

Comando arrancado:
66 7f 80 80 80 02 fd 99

Comando tras emergency stop:
66 7f 80 80 80 04 fb 99


# Throttle Subir/Bajar (00 - FF) (0-255)
xx xx xx TT xx xx xx xx

bajar max: 66 7f 80 00 80 00 7f 99
subir max: 66 7f 80 ff 80 00 80 99


# Rotar sobre su eje vertical (2c - d2) (44-210):
xx xx xx xx RR xx xx xx

contra agujas maximo:   66 7f 80 81 2c 00 52 99
aguas del reloj maximo: 66 7f 80 8d d2 00 a0 99


# Avanzar/Retroceder (22 - D3)(34-211)
xx xx AA xx xx xx xx xx
retroceder al maximo: 66 7f 2e 80 80 00 51 99
avanzar al maximo:    66 81 d2 80 80 00 53 99


# Avanzar izquierda/derecha (2b - d1)(43-209):
xx LL xx xx xx xx xx xx

izquierda maximo: 66 2b 80 80 80 00 ab 99
derecha maximo:   66 d1 80 80 80 00 51 99



# Estado
xx xx xx xx xx SS xx xx

00 Inicio
02 Arrancado
04 Stop
0c Emergency stop


# Checksum
66 LL AA TT RR SS KK 99
(LL ^ AA ^ TT ^ RR ^ SS) & 0xFF
