https://www.medo64.com/2019/01/systemd-watchdog-for-any-service/
Mirar ejemplo en el último comentario.

La idea es hacer un wrapper script que mire si nuestro servicio funciona.
En caso contrario, dejará de enviar "keep alives" a systemd y este reiniciará el servicio.
