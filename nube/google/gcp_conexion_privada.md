La solución que ofrece, Cloud VPN, es para conectar site-to-site
https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview
Cloud VPN solo es compatible con la conectividad de VPN con IPsec de sitio a sitio, sujeta a los requisitos que se indican en esta sección. No es compatible con las situaciones cliente a puerta de enlace (road warrior)


Las recomendaciones para conectar a los sistemas:
https://cloud.google.com/solutions/connecting-securely

firewall
tunel ssh (simplificado con gcloud)
proxy socks (también con gcloud)
host bastion
cloud vpn (para site-to-site)
