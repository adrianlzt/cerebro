## http://www.tutorialspoint.com/perl/perl_subroutines.htm
# Tambien se puede llamar a las subrutinas como &subrutina() para algunas cosas especiales http://perldoc.perl.org/perlsub.html

sub suma{
  $numparam = scalar(@_);
  print "tenemos $numparam parametros\n";
  $param1 = shift;
  $param2 = shift;

  return $param1+$param2;
}

$num = suma(3,10);
print "numero $num\n\n";


sub suma2{
  foreach $item (@_) {
    print "param $item\n";
  }
}

suma2("primero","segundo");


# Array
sub PrintList{
   my @list = @_;
   print "Given list is @list\n";
}

$a = 10;
@b = (1, 2, 3, 4);
PrintList($a, @b);
