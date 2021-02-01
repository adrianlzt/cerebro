/etc/apt/apt.conf.d/02allow-unathenticated
APT::Get::AllowUnauthenticated 1;

Esta parece que no me funciona



Otra forma que he visto
deb [trusted=yes] file:///var/lib/local-apt-repository/ ./

