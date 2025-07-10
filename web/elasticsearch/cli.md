https://github.com/cyborgize/es-cli

Ejemplo:
```bash
es search cluster1.mydomain.com:9200 myindex -e boringfield -n 10 -f source '{"query":{"term":{"field1":12345}}}'
```


https://pypi.org/project/elasticsearch-shell/
Mi cli que intenta simular como funciona kibana dev tools.
```bash
❯ ES_HOST="https://es01:9200" ES_USERNAME=reader ES_PASSWORD=password uvx elasticsearch-shell
Connected to Elasticsearch. Enter a request and press Meta+Enter (or Esc then Enter) to submit. Ctrl+D to exit.
>>> GET _cat/health
"1752151831 12:50:31 7ec6b11ceafd4572b3ff9a1ce4d4bb97 green 7 5 7969 7502 0 0 0 0 0 - 100.0%\n"
```
