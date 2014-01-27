$ julia -p 4

 2577  7038  7038  2577 pts/5     7038 Sl+   1000   0:05              |   |           |   \_ julia -p 4
 7038  7041  7041  7041 ?           -1 Ss    1000   0:05              |   |           |       \_ /usr/bin/./julia-basic --bind-to 127.0.0.1 --worker
 7038  7042  7042  7042 ?           -1 Ssl   1000   0:05              |   |           |       \_ /usr/bin/./julia-basic --bind-to 127.0.0.1 --worker
 7038  7043  7043  7043 ?           -1 Ssl   1000   0:05              |   |           |       \_ /usr/bin/./julia-basic --bind-to 127.0.0.1 --worker
 7038  7044  7044  7044 ?           -1 Ssl   1000   0:05              |   |           |       \_ /usr/bin/./julia-basic --bind-to 127.0.0.1 --worker


$ julia --machinefile maquinas

maquinas (deben ser accesible por ssh sin password):
peter.local
alopez@10.23.42.23:22
user@machine.aws.com:2220


-L --load=file           Load <file> right after boot on all processors
