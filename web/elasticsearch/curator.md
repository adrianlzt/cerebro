https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html

Puede hacer más cosas:
https://www.elastic.co/guide/en/elasticsearch/client/curator/current/about-features.html



# curator-cli
Generalmente usado para borrar indices antiguos.

Mostrar los indices de metricbeat más antiguos de 15 días:
/curator/curator_cli --host 172.17.0.1 show_indices --filter_list '[{"filtertype":"pattern","kind":"prefix","value":"metricbeat"},{"filtertype":"age","source":"creation_date","direction":"older","unit":"days","unit_count":15}]'


Borrar indices más antiguos de 15 días. Podemos usar --dry-run para ver que se va a borrar:
/curator/curator_cli --host 172.17.0.1 delete_indices --filter_list '[{"filtertype":"pattern","kind":"prefix","value":"metricbeat"},{"filtertype":"age","source":"creation_date","direction":"older","unit":"days","unit_count":15}]'


# Docker
Bajar repo de github y construir la imagen

No testeado
docker run -v "$PWD/curator.yml:/curator.yml" -v "$PWD/actions:/actions" --rm -it curator --dry-run --config /curator.yml /actions/delete_indices.yml
