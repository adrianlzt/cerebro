http://www.metasploit.com/

World's most used penetration testing software

Put your network's defenses to the test
A collaboration of the open source community and Rapid7. Our penetration testing software, Metasploit, helps verify 
vulnerabilities and manage security assessments.

Interfaz gráfico: armitage.md

# Arch
https://wiki.archlinux.org/index.php/Metasploit_Framework
https://aur.archlinux.org/packages/metasploit/
yaourt -S aur/metasploit
pacman -S postgresql
sudo -u postgres initdb --locale es_ES.UTF-8 -D '/var/lib/postgres/data'
sudo systemctl start postgresql.service
sudo -u postgres createuser -DRSP msf
msfd
  arrancamos el servicio msfd

Configurar bbdd:
~/.msf4/database.yml
production:
 adapter: postgresql
 database: msf
 username: msf
 password: msf
 host: localhost
 port: 5432
 pool: 5
 timeout: 5

# Server
/opt/metasploit/msfrpcd -P 123
  se pone a escuchar en el puerto 55553 (necesario para armitage)
  password definida a 123

# Consola
https://www.offensive-security.com/metasploit-unleashed/msfconsole-commands/
msfconsole

help - ayuda
help COMANDO - ayuda específica de un comando
back - volver al menu anterior
show auxiliary
show exploits
show payloads
show encoders
show nops


# Database
Conectar:
msf > db_connect msf:msf@127.0.0.1/msf
[*] Rebuilding the module cache in the background...


# Exploits
show exploits
search NOMBRE
search NOMBRE type:post
  The search function will locate this string within the module names, descriptions, references, etc.
  Podemos filtrar por campos
use exploit/tab>

## Configurar
show options
set OPCION VALOR
show advanced

## Check
check
  comprueba si el sistema es explotable (si el exploit incorpora esta funcionalidad)

## Targets
SOs vulnerables a este exploit

## Run
run
run -j
  arranca como session (en backgroun)
Control+c para salir
Control+z para dejar en background <- pone en backgroun toda la app, hay que hacer fg, y dar a 'y' para poner el exploit en backgroun


# Sessions / background
Cuando mandamos un explot a background con -j o Control+Z

sessions
  lista las sessiones activas
sessions -h
  ayuda
session -i N
  entra en la session N
sessions -k 2
  mata la segunda session


# Payloads
show payloads
  dentro de un exploit, nos muestra solo los que pueden ser compatibles (pero no tienen por que serlo)
set payload cmd/unix/reverse


# Post
Comandos/funcionalidades/mejoras a ejecutar tras tener una shell en backgroun:
use post/linux/gather/checkvm
set SESSION 5
run
  nos dirá si el host es una maquina virtual

## Meterpreter
post/multi/manage/shell_to_meterpreter
  este, teniendo una shell, nos da mucha más funcionalidad, sobre todo en sistemas windows

Una vez arrancado meterpreter entraremos en su session:
sessions -i N

Nos dara una shell con comandos predefinidos por meterpreter


# Claves
search hashdump

Para linux:
post/linux/gather/hashdump

search jtr
  opciones con john the ripper
use auxiliary/analyze/jtr_linux
show options
