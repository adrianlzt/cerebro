https://hub.docker.com/r/prestashop/prestashop/

docker pull prestashop/prestashop

ADMIN_MAIL=admin@admin.com ADMIN_PASSWD=prestaADMIN docker run -ti --name some-prestashop -p 8080:80 -d prestashop/prestashop

Para la conex a la bbdd:
root:admin
db name: prestashop
