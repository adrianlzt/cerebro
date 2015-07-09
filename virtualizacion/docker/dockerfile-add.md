ADD: añadir ficheros al container
ADD <src> <dest>
src debe ser un fichero o directorio con path relativo al workdir actual, o una url

ADD hace un checksum del fichero para saber si debe actualizarlo, por lo tanto si cachea
