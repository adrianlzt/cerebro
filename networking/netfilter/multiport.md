Reglas multipuerto:

-A INPUT -p tcp -m multiport --dports 80,443,25,587,110,995,143,993,4190 -j f2b-nginx
