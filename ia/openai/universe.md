https://openai.com/blog/universe/

Miles de juegos listos para usar con gym.
Pasamos un ID de un juego a gym, y hacemos un bucle para ir enviando comandos a los controles del juego (arriba, derecha, etc) y nos devuelve la puntuación (o lo que se vea en pantalla para saber que vamos bien)


Universe exposes a wide range of environments through a common interface: the agent operates a remote desktop by observing pixels of a screen and producing keyboard and mouse commands. The environment exposes a VNC server and the universe library turns the agent into a VNC client.


# Install
pip install universe
  instala gym como dependencia

Tendremos que tener docker instalado y con permisos para el usuario (sudo gpasswd -a adrian docker)





