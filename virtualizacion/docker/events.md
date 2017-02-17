https://docs.docker.com/engine/reference/commandline/events/

Escuchar los eventos de docker.

Mirar docker-gen para actuar ante eventos.



Ejemplo evento de creacion de un container:
2017-02-16T10:02:53.530980973+01:00 container create d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636 (image=gliderlabs/alpine:3.3, name=flamboyant_hawking)
2017-02-16T10:02:53.531816685+01:00 container attach d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636 (image=gliderlabs/alpine:3.3, name=flamboyant_hawking)
2017-02-16T10:02:53.599607330+01:00 network connect cbea3a4f05633e2b6be4cc2330d14feb1cfdf93758f8bd214bd40a9422b5ae0f (container=d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636, name=bridge, type=bridge)
2017-02-16T10:02:53.823652020+01:00 container start d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636 (image=gliderlabs/alpine:3.3, name=flamboyant_hawking)
2017-02-16T10:02:53.824985310+01:00 container resize d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636 (height=13, image=gliderlabs/alpine:3.3, name=flamboyant_hawking, width=105)


Y de parada correcta:
2017-02-16T10:03:10.438290500+01:00 container die d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636 (exitCode=0, image=gliderlabs/alpine:3.3, name=flamboyant_hawking)
2017-02-16T10:03:10.561551011+01:00 network disconnect cbea3a4f05633e2b6be4cc2330d14feb1cfdf93758f8bd214bd40a9422b5ae0f (container=d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636, name=bridge, type=bridge)
2017-02-16T10:03:10.866913191+01:00 container destroy d087edffd3b7572de0a0e94262a94265591ec3d40d23b8655de1c411bc3fa636 (image=gliderlabs/alpine:3.3, name=flamboyant_hawking)



Parada incorrecta:
2017-02-16T10:03:30.034403783+01:00 container die 4a9839d4c5f4847e7fcce94a98b49f410972214c69e7da038db5c5fbd952f71a (exitCode=1, image=gliderlabs/alpine:3.3, name=mystifying_rosalind)
2017-02-16T10:03:30.184876969+01:00 network disconnect cbea3a4f05633e2b6be4cc2330d14feb1cfdf93758f8bd214bd40a9422b5ae0f (container=4a9839d4c5f4847e7fcce94a98b49f410972214c69e7da038db5c5fbd952f71a, name=bridge, type=bridge)
2017-02-16T10:03:30.505981251+01:00 container destroy 4a9839d4c5f4847e7fcce94a98b49f410972214c69e7da038db5c5fbd952f71a (image=gliderlabs/alpine:3.3, name=mystifying_rosalind)



Si hacemos un docker stop, lanza primero un kill 15 y si no muere, un kill 9:
2017-02-16T10:04:27.789338534+01:00 container kill 7f5bb63030f2d64f0d94e6e1512ea35261d9b8af8a09903caa00b29b3f11b77d (image=gliderlabs/alpine:3.3, name=boring_heisenberg, signal=15)
2017-02-16T10:04:37.790466659+01:00 container kill 7f5bb63030f2d64f0d94e6e1512ea35261d9b8af8a09903caa00b29b3f11b77d (image=gliderlabs/alpine:3.3, name=boring_heisenberg, signal=9)
2017-02-16T10:04:37.854997858+01:00 container die 7f5bb63030f2d64f0d94e6e1512ea35261d9b8af8a09903caa00b29b3f11b77d (exitCode=137, image=gliderlabs/alpine:3.3, name=boring_heisenberg)
2017-02-16T10:04:37.971536492+01:00 network disconnect cbea3a4f05633e2b6be4cc2330d14feb1cfdf93758f8bd214bd40a9422b5ae0f (container=7f5bb63030f2d64f0d94e6e1512ea35261d9b8af8a09903caa00b29b3f11b77d, name=bridge, type=bridge)
2017-02-16T10:04:38.081275074+01:00 container stop 7f5bb63030f2d64f0d94e6e1512ea35261d9b8af8a09903caa00b29b3f11b77d (image=gliderlabs/alpine:3.3, name=boring_heisenberg)
2017-02-16T10:04:38.270080190+01:00 container destroy 7f5bb63030f2d64f0d94e6e1512ea35261d9b8af8a09903caa00b29b3f11b77d (image=gliderlabs/alpine:3.3, name=boring_heisenberg)


Si muere con el kill 15, exit code = 143
Si muere con kill 9, exit code = 137

