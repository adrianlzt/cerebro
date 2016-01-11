Entorno gráfico para metasploit

# Instalar
Bajar de http://www.fastandeasyhacking.com/download

tar xvf armitage*
cd armitage
msfrpcd -P 123 -S -U msf -a 127.0.0.1 -f
MSF_DATABASE_CONFIG=/home/adrian/.msf4/database.yml java -jar armitage.jar


Tras arrancar nos escaneará la red y nos mostrará los ordenadores conectados.
Si damos a Attacks->Find Attacks
Nos pondrá una nueva pestaña asociada a cada host con los ataques disponibles por cada servicio abierto.


Con meterpreter y armitage podemos navegar por los ficheros facilmente.

post>linux>gather>hashdump
  bajarnos las passwords (/etc/shadow)

View>Credentials
  vemos las passwords y podemos ejecutar el john the ripper (auxiliary>jtr_crack_fast)
