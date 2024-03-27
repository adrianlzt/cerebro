http://www.wireshark.org/docs/man-pages/tshark.html

tcpdump supervitaminado


-Y "filtro wireshark"
-T formato de salida
-E opciones de como mostrar los campos
-e campo a mostrar

https://twitter.com/glennzw/status/936220651093938180?s=09
tshark -ni en0 -Y "bootp.option.type == 53" -T fields -e bootp.option.hostname -e eth.src_resolved
See who's on the Starbucks WiFi with you


Parece que los filtros no son exactamente iguales a wireshark.

Sacar las queries ejecutadas en una captura de postgresql:
tshark -r tcpdump_configuration_syncer.pcap -Y 'pgsql.query' -T fields -e pgsql.query
