http://jinja.pocoo.org/docs/dev/templates/#tests

{% if service %}
hola service
{% endif %}

# Poner una coma solo si no es el último elemento
"DB_HOSTS": "{% for ip in mongodb_hosts %} {{ip}}:27017{% if not loop.last %},{% endif %}{% endfor %}",


{% if kenny.sick %}
    Kenny is sick.
{% elif kenny.dead %}
    You killed Kenny!  You bastard!!!
{% else %}
    Kenny looks okay --- so far
{% endif %}
