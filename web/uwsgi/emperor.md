http://uwsgi-docs.readthedocs.org/en/latest/Emperor.html

The uWSGI Emperor – multi-app deployment

If you need to deploy a big number of apps on a single server, or a group of servers, the Emperor mode is just the ticket. It is a special uWSGI instance that will monitor specific events and will spawn/stop/reload instances (known as vassals, when managed by an Emperor) on demand.
