ADD: añadir ficheros al container
ADD <src> <dest>
ADD --chown=user:group <src> <dest>
ADD <src1> <src2> ... <dest>
src debe ser un fichero o directorio con path relativo al workdir actual, o una url

ADD hace un checksum del fichero para saber si debe actualizarlo, por lo tanto si cachea


COPY mejor que ADD



Add puede descargarse ficheros de internet y descomprimir ficheros
