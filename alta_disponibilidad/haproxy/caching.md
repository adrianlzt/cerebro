https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#10

Recomendada solo parra cachear objetos pequeños (favicon, css, etc).

total-max-size, tamaño de la cache, hasta 4096MB.

max-object-size, tamaño máximo, en bytes, de cada objeto cacheado. Debe ser menos que total-max-size/2. Objetos más grandes no serán cacheados. Por defecto, total-max-size/256

max-age <seconds>, la duración máxima será el mínimo entre este valor y el que venga en la header Cache-Control

Ejemplo:
backend bck1
  mode http

  http-request cache-use foobar
  http-response cache-store foobar
  server srv1 127.0.0.1:80

cache foobar
  total-max-size 4
  max-age 240
