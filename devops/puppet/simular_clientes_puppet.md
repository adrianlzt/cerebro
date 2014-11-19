En una misma máquina:

for i in {1..5}; do
FACTER_fqdn=nombre puppet agent -t --vardir=/var/lib/puppet-nombre$i --certname=nombre$i &
done

cuidado, pueden colisionar si intentan usar yum al mismo tiempo?

Podemos usar --noop si lo que queremos son los exported resources, así evitaremos colisiones locales.
