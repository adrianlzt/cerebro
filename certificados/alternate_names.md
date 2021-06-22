Obtener los alternate names válidos de un cert:
openssl s_client -connect example.com:443 < /dev/null | openssl x509 -noout -text | grep -C3 -i dns
