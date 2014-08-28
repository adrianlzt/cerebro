Paquetes con varias funciones criptográficas.

En RedHat like se instala con:
yum install postgresql-contrib

Para instalar pycrypto en los esquemas (bases de datos) que tengamos:
psql -f /usr/share/pgsql/contrib/pgcrypto.sql -d BASE_DE_DATOS
