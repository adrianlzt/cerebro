# Es como pasar punteros:

sub verify {
  my $ref = shift;
  print "valor inicial $ref->{'username'}\n\n";
  $ref->{'username'} += 10;
}

my %data = (username => 3, etc => "etc");
my $valid = verify(\%data);

print "valor posterior $data{'username'}";
