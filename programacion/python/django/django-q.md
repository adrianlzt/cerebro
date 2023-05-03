https://github.com/django-q2/django-q2

A multiprocessing distributed task queue for Django based on Django-Q

En un proyecto de Django configuramos django-q2 conectándolo a un broker (redis, mongo, el propio django, etc).

Luego tenemos que arrancar los "clusters" (workers) donde queramos que conecten con el mismo broker.
