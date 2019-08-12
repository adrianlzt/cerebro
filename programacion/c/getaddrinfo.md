https://en.wikipedia.org/wiki/Getaddrinfo

Solo resolver IPv4:
hints.ai_family = AF_INET;
s = getaddrinfo("www.facebook.com", NULL, &hints, &result);

Para resolver A+AAAA usar AF_UNSPEC

Solo IPv6: AF_INET6
