DNS y los 6to4 relay routers usan anycast.
Comparten la misma ip, y cada uno exporta el prefijo (192.88.99.0/24 porque los grandes routers no cogen prefijos más grandes).
Dependiendo de nuestra localización física, llegaremos a uno u otro servidor.

Esto no se puede generalizar, porque entonces las tablas de los routers explotarían. Habría un monton de empresas exportando pequeños prefijos.

Solo se permite a DNS y los relay routers de 6to4


CloudFlare tambien usa anycast
https://blog.cloudflare.com/a-brief-anycast-primer/
It is not easy to setup a true Anycasted network. It requires that you own your own hardware, build direct relationships with your upstream carriers, and tune your networking routes to ensure traffic doesn't "flap" between multiple locations. We've taken the time to do that at CloudFlare because it helps ensure all our users have access to a faster, safer, better Internet.
