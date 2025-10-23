<http://www.wireshark.org/docs/man-pages/tshark.html>

tcpdump supervitaminado

-Y "filtro wireshark"
-T formato de salida
-E opciones de como mostrar los campos
-e campo a mostrar

<https://twitter.com/glennzw/status/936220651093938180?s=09>

```bash
tshark -ni en0 -Y "bootp.option.type == 53" -T fields -e bootp.option.hostname -e eth.src_resolved
```

See who's on the Starbucks WiFi with you

Parece que los filtros no son exactamente iguales a wireshark.

Sacar las queries ejecutadas en una captura de postgresql:

```bash
tshark -r tcpdump_configuration_syncer.pcap -Y 'pgsql.query' -T fields -e pgsql.query
```

Volcar en ElasticSearch

```bash
tshark -T ek -j "http tcp ip" -P -V -x -r file.pcap > file.json
curl -H "Content-Type: application/x-ndjson" -XPOST http://elasticsearch:9200/_bulk --data-binary "@file.json"
```

Estadísticas
Para ver todas las posibles usar "-z help"

```bash
tshark -r zabbix_configuration_syncer.pcap -z endpoints,tcp -q
```

Histograma tamaños paquetes (<https://osqa-ask.wireshark.org/questions/16371/how-can-i-get-packet-size-summary-by-tshark/>):

```bash
tshark -nr input.pcap -T fields -e frame.len | gsl-histogram 0 60000 30
```

Si queremos saber el tamaño máximo de paquete, podemos hacer primero:

```bash
tshark -nr input.pcap -T fields -e frame.len | sort -n | tail -n 1
```
