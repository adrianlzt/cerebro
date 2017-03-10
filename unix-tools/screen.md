# http://aperiodic.net/screen/quick_reference


C-a significa mientras tengo el control pulsado, pulso 'a'

$ screen
C-a d  //Dettach una sesion

Darle nombre a un screen
screen -S <nombre>

Renombrar sesión:
C-a :sessionname NombreSesion

Recupera una sesión
screen -r

Attaches to a screen session. If the session is attached elsewhere, detaches that other display. If no session exists, creates one. If multiple sessions exist, uses the first one
screen -dRR 

Crear una sesion de nombre adrian. Unirse a ella aunque este attached
screen -dR adrian

Unirse a una screen multiple
screen -rx

Como unirse distintos usuarios a una misma screen: http://martinfitzpatrick.name/article/collaborate-in-the-shell-with-screen-multiuser

Ayuda:
C-a ?


C-a c  //crear una nueva ventana
C-a i  //informacion sobre la ventana (numero de ventana)
C-a C-w //lista las ventanas
C-a "  //muestra la ventanas y elige una
C-a '  // cambiar por nombre o numero
C-a A  //set title
C-a H //log window to file. Start & stop
C-a x //lock screen
C-a : quit  //Salir de todas las windows

C-a h  //Screenshot, lo guarda en el directorio que estemos como hardcopy.n (n, numero de ventana)

C-a S  //split window horizontally
C-a |  //split vertically
C-a Q  //sale del split (nos quedamos en la que tenga el foco)
C-a tab //salta entre los splits
C-a X  //cierra la ventana que tenga el foco
C-a :resize =  //todos los splits del mismo tamaño
C-a :resize +5  //agrandar la screen actual

C-a [0-9] //selecciona ventana
C-a C-a //salta a la ultima ventana
C-a [n,space,p] //siguiente,siguiente,previa

C-a :  //meter comandos screen
C-a M  //Avisar de cambios en esa window (comando para activar y desactivar)
C-a _  //Avisarme si tras 30 segundos no hay actividad en la ventana

#########
Con el .screenrc tuneado:

F1, F2 para seleccionar las ventanas
C-a +/-/=  Para crecer un split

#########
Pasar mensaje a una sesion
# run bash within screen
screen -AmdS bash_shell bash

# run top within that bash session
screen -S bash_shell -p 0 -X stuff $'top\r'

# ... some time later

# stuff 'q' to tell top to quit
screen -S bash_shell -X stuff 'q'

# stuff 'exit\n' to exit bash session
screen -S bash_shell -X stuff $'exit\r'


Meter comandos
C-A


# Bash history



# Arrancar una session con distintas screens
screen -t top    0 top
screen -t syslog 1 tail -F /var/log/syslog


Save the above to a file, say "fancy.screenrc". Then start screen with:
Code:
screen -c fancy.screenrc
