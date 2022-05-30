awx_ssl_certificate: null

Si ponemos esa variable con ese valor, este condicional será cierto:
{% if awx_ssl_certificate is none %}
