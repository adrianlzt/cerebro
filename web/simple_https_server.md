python -m SimpleHTTPServer &  ncat -l 8443 --sh-exec "ncat 127.0.0.1 8000" --keep-open --ssl
curl -k https://localhost:8443


python2 -m SimpleHTTPServer 8043 & sudo ncat -l 8443 --sh-exec "ncat 127.0.0.1 8043" --keep-open --ssl
curl -k https://localhost

Si queremos poner un certificado:
  --ssl-cert             Specify SSL certificate file (PEM) for listening
  --ssl-key              Specify SSL private key (PEM) for listening



Si nos da error
socket.error: [Errno 98] Address already in use

Matar un el python que está escuchando en el 8000
jobs
