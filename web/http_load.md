Ideas de como lanzar load tests com AWS:
https://www.reddit.com/r/aws/comments/640cb6/using_aws_for_load_testing/

https://locust.io/
programa en python para hacer pruebas
podemos distribuir los workers por varios servers

http://molotov.readthedocs.io/en/stable/
Pruebas de carga con python


http://acme.com/software/http_load/

http_load runs multiple http fetches in parallel, to test the throughput of a web server. However unlike most such test clients, it runs in a single process, so it doesn't bog down the client machine. It can be configured to do https fetches as well.

You give it a file containing a list of URLs that may be fetched, a flag specifying how to start connections (either by rate or by number of simulated users), and a flag specifying when to quit (either after a given number of fetches or a given elapsed time). There are also optional flags for checksums, throttling, random jitter, and progress reports.



# SaaS
https://loadimpact.com/features
free: 50 users
100$/mo 100 users
300$/mo 1000 users 2 zonas
700$/mo 5000 users 12 zonas


https://loadfocus.com/pricing-and-plans
gratis 14 dias
50$/mo 1000 usuarios concurrentes


https://loader.io/pricing
gratis 10000 clients/test, 1 host, 1 min, 2 urls
100$/mo 100.000 clients/test
Para lanzar el test es necesario que verifiquen que el dominio es nuestro. Esto se puede hacer colgando un fichero del root o con DNS (este último de pago)



https://www.neotys.com/neoload/pricing
no especifican precios
