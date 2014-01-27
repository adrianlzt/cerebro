Otra idea es generar imágenes provisionándolas con puppet o chef.

Un ejemplo con chef: https://github.com/paulczar/docker-chef-solo

La idea es instalar puppet, añadir los módulos (ADD), y ejecutar puppet.
Por último tenemos que dejar corriendo lo que hayamos instalado (RUN / ENTRYPOINT)
