PROXY=$(echo $1 | cut -d ':' -f 1)
PROXY_PORT=$(echo $1 | cut -d ':' -f 2)

MI_IP=$(cat mi_ip)

nc -w 3 -vz $PROXY ${PROXY_PORT} >& /dev/null
if [[ $? -eq 0 ]]; then
  respuesta=$(curl -m 4 -s --proxy $1 eth0.me)
  if [[ $respuesta =~ [0-9\.]* ]]; then
    if [[ $respuesta == ${MI_IP} ]]; then
      echo $1 >> proxies_no_anonimos.txt
    else
      echo $1 >> proxies_anonimos.txt
    fi
  fi
fi
