http://perldoc.perl.org/perlre.html#Regular-Expressions


if ( $line =~ m/id:cli-(prefer|standby)-(\S+)\)/ ) {

Hace match contra la línea:
Enabled on: ESJC-DSMM-MS06S (score:INFINITY) (role: Started) (id:cli-prefer-Icinga_ESJC-DSMM-CLS0XS)
Y almacena en $2 Icinga_ESJC-DSMM-CLS0XS


Almacenar un regexp en variable:
my $re = qr/location cli-(prefer|standby)-\S+\s+(\S+)/;

DB<19> $op = qr/ksd/           
DB<20> if ( "ksdertsd" =~ $op) { print "ok"; }
ok

