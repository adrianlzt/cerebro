https://www.elastic.co/guide/en/beats/packetbeat/current/_kibana_query_and_filter.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html

Solo se pueden filtrar datos indexados.

Recordar poner AND entre las búsquedas, si no por defecto serán ORs.

# Busquedas
type: access_combined AND request.raw: /.*phone\/v2\/users\/.*\/jours/ AND verb: POST


# Regex
request.raw: /.*phone\/v2\/users\/.*\/jours/
Match:
/phone/v2/users/9580ba4724444c7778888e16333c3241325d49e1/jours


# Pinned filters
Si estamos en modo "Discover" y queremos pasar el filtro que tenemos a "Visualize", nos pondremos sobre el y pincharemos a la chincheta
