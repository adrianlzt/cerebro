https://github.com/joewalnes/websocketd
https://github.com/joewalnes/websocketd/wiki

Turn any program that uses STDIN/STDOUT into a WebSocket server. Like inetd, but for WebSockets.

Es como conectar el navegador con el stdin/stdout de un programa.


Se necesita tener mercurial instalado para ejecutar el make.
Genera un binario.
Instalado en /usr/local/bin (por mi)

Si no somos root, cambiar puerto:
websocketd --port=8080

Abrir websocketd.html
No me funciona si apunto directamente el navegador al html.
Uso "python -m SimpleHTTPServer" para servir el html 


Viendo un log en el navegador:
websocketd --port=8080 tail -f /var/log/syslog
