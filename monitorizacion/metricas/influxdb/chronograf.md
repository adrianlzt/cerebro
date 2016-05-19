# Install
yum instal chronograf

# Config
/opt/chronograf/config.toml

Por defecto solo escucha en 127.0.0.1

Para todo:
Bind = "0.0.0.0:10000"

# Run
service chronograf start

Arranca en el puerto 10000


# Ideas
Muy limitado (7/3/2016)
Grafana tiene mucha más funcionalidad.

Quizas la única mejora es la posibilidad de hacer query a determinados RP
