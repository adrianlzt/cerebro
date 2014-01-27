http://www.tutorialspoint.com/perl/perl_hashes.htm

$data{'John Paul'} = 45;
$data{'Lisa'} = 30;
$data{'Kumar'} = 40;
%data = ('John Paul', 45, 'Lisa', 30, 'Kumar', 40);
%data = ('John Paul' => 45, 'Lisa' => 30, 'Kumar' => 40);
%data = (-JohnPaul => 45, -Lisa => 30, -Kumar => 40);


$data{'John Paul'}
%data{-Lisa}


Hash to array
@names = keys %data;
@ages = values %data;

Tamaño
scalar(keys %data)

Eliminar entrada
delete $data{'clave'}

Existencia de claves:
if( exists($data{'Lisa'} ) ){

Iterar (no lo saca ordenado):
%dt = ("cosa" => 1, "dos" => 2, "otro" => "tres");
keys %dt; #Reinicia el contador para que no pueda afectar otro each anterior
while ( my($k,$v) = each %dt ) {
  print "key: $k, valor: $v\n";
}

