https://whois.icann.org/es/descripci%C3%B3n-t%C3%A9cnica

Lista de servidores whois a quien preguntar para cada tipo de dominio:
https://github.com/rfc1036/whois/blob/next/tld_serv_list

Puerto tcp/43

El protocolo es texto.
Ejemplo de query:

echo "=google.com" | nc 199.7.48.74 43

Nos devolverá todos los dominios que empiecen por google.com
Veremos mucha basura tipo google.com.basura...


Los servidores pueden almacenar la información en modo ligero (thin) o denso (thick)
En modo ligero el servidor almacena algunos detalles y otro servidor whois donde consultar la información completa.


Cliente linux: https://github.com/rfc1036/whois
