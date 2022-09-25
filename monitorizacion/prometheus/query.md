https://prometheus.io/docs/prometheus/latest/querying/basics/


# query_range
query_range?query=fuerza_peso&start=1584950052&end=1584950062&step=0.5
Nos devuelve un punto cada 500ms entre esas unix epoch.
Aunque tengamos más o menos resolución, nos devolverá un punto cada 500ms.
Si tenemos menos puntos, habrá huecos.
En victoria podemos pasarle la función keep_last_value para rellenar los huecos.


# raw
Nos devuelve todos lo puntos del último minuto de la serie "fuerza_peso"
curl '127.0.0.1:8428/api/v1/query?query=fuerza_peso[1m]' | python -m json.tool
