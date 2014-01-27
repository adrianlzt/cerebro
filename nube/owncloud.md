http://software.opensuse.org/download/package?project=isv:ownCloud:community&package=owncloud

CentOS 6:
cd /etc/yum.repos.d/
wget http://download.opensuse.org/repositories/isv:ownCloud:community/CentOS_CentOS-6/isv:ownCloud:community.repo
yum install owncloud


Existe owncloud en el aws marketplace


ownCloud powered by BitNami
https://aws.amazon.com/marketplace/pp/B0093N7LP2/ref=srh_res_product_title?ie=UTF8&sr=0-2&qid=1383679111113

Para usar free tier, arrancar en instancia micro y con EBS de 30GB.
Conectar con (cambiar direccion): http://ec2-54-220-194-141.eu-west-1.compute.amazonaws.com/owncloud/
username: user
password: bitnami

Clientes para pcs:
http://owncloud.org/sync-clients/

En el cliente, darle la url con https
