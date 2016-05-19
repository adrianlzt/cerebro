rm proxylist-*.txt
python proxy-scraper.py
cat proxylist-*.txt  | grep -v span > proxylist_sin_mierda
echo "Obteniendo mi ip"
curl -s eth0.me > mi_ip
echo "Probando los proxies..."
cat proxylist_sin_mierda | xargs -P 25 -n 1 ./test_proxy.sh
