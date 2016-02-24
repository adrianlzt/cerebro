http://perldoc.perl.org/perlre.html#Regular-Expressions


if ( $line =~ m/id:cli-(prefer|standby)-(\S+)\)/ ) {

Hace match contra la línea:
Enabled on: HOSTA-XX-MM (score:INFINITY) (role: Started) (id:cli-prefer-Icinga_HOST-XS)
Y almacena en $2 Icinga_HOST-XS


Almacenar un regexp en variable:
my $re = qr/location cli-(prefer|standby)-\S+\s+(\S+)/;

DB<19> $op = qr/ksd/           
DB<20> if ( "ksdertsd" =~ $op) { print "ok"; }
ok


Aplicar sed inlines:
$output =~ s/A/B/g;
  coge la variable $output y cambia las 'A' por 'B'


Almacenar el resultado en un var distinta:

($new = $old) =~ s/pepe/JOSE/
