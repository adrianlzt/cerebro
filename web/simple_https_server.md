python3 -m http.server 8080 & ncat -l 8443 --sh-exec "ncat 127.0.0.1 8080" --keep-open --ssl

python2 -m SimpleHTTPServer & ncat -l 8443 --sh-exec "ncat 127.0.0.1 8000" --keep-open --ssl
curl -k <https://localhost:8443>

python2 -m SimpleHTTPServer 8043 & sudo ncat -l 8443 --sh-exec "ncat 127.0.0.1 8043" --keep-open --ssl
curl -k <https://localhost>

Si queremos poner un certificado:
--ssl-cert Specify SSL certificate file (PEM) for listening
--ssl-key Specify SSL private key (PEM) for listening

Parece que no le gusta con ficheros con multiples certificados dentro

Si nos da error
socket.error: [Errno 98] Address already in use

Matar un el python que está escuchando en el 8000
jobs

```python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
from pathlib import Path

port = 4443

httpd = HTTPServer(("localhost", port), SimpleHTTPRequestHandler)
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(Path(__file__).parent / "server.pem")
httpd.socket = ssl_context.wrap_socket(
    httpd.socket,
    server_side=True,
)

print(f"Serving on https://localhost:{port}")
httpd.serve_forever()
```

El fichero server.pem debe contener el cert y la key.
