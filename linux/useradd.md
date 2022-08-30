Crear usuario con password definida, grupo sudo y dir home.

useradd -s /bin/bash -d /home/pepe/ -m -G sudo --password $(perl -e 'print crypt($ARGV[0], "password")' 'YOUR_PASSWORD') pepe
