http://orchardup.github.io/fig/

Sirve para describir arquitecturas de servicios montados sobre Docker.

Ejemplo:

web:
  build: .
  ports:
   - 5000:5000
  volumes:
   - .:/code
  links:
   - redis
redis:
  image: orchardup/redis


Al hacer 'fig up' creará una imagen con el Dockerfile que tengamos en el mismo directorio, exportara el puerto, montara ese directorio, y enlazará la instancia con otra instancia redis usando la imagen que elegimos.
