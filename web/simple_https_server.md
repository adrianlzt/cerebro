python -m SimpleHTTPServer &  ncat -l 8443 --sh-exec "ncat localhost 8000" --keep-open --ssl
curl https://localhost:8443 -k

