https://dev.mysql.com/doc/refman/5.7/en/miscellaneous-functions.html

# Convertir IPs en formato numérico y viceversa
select inet_aton("10.1.2.3");
> 167838211

select inet_aton("10.1.2.30")-inet_aton("10.1.2.3");
> 27
