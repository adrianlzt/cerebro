https://graphite.readthedocs.org/en/latest/render_api.html

Podemos pedir a graphite que nos renderize una gráfica, o que nos pase los datos como json, csv, etc.
Se hace con /render?

Ejemplo:
http://icinga.com/render?from=-30minutes&until=-0hour&target=icinga.client2.com.check_users.users&lineMode=connected&lineWidth=2

Se pueden pedir métricas del tipo host.cosa.* y me genera una gráfica con todas las metricas metidas.


&format=json
