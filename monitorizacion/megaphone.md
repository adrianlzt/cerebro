https://github.com/looprock/Megaphone

Megaphone is a bottle.py based service that is intended to proxy and collate JSON based status data in a centralized service.

The idea is to provide a per system consistent API for checking the status of all services on that system. This means:

A) Any service that is registered or discovered on a box will instantly be monitored

B) Operations will always know how to monitor a new system
