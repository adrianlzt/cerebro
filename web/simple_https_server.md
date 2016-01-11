python -m SimpleHTTPServer &  ncat -l 8443 --sh-exec "ncat 127.0.0.1 8000" --keep-open --ssl
curl -k https://localhost:8443


python -m SimpleHTTPServer & sudo ncat -l 443 --sh-exec "ncat 127.0.0.1 8000" --keep-open --ssl
curl -k https://localhost


Si nos da error
socket.error: [Errno 98] Address already in use

Matar un el python que está escuchando en el 8000
jobs
