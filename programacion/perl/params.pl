#
# perl params.pl -arg1 uno -arg2 dos -arg3 tres
#

use Getopt::Long;
my %args;
GetOptions(\%args,
           "arg1=s",
           "arg2=s",
           "arg3=s",
) or die "Invalid arguments!";
# Sale del programa si se pasa un parametro que no esta aqui reflejado

# Sale del programa si falta el arg1
die "Missing -arg1!" unless $args{arg1};

print "arg1 $args{arg1}\narg2 $args{arg2}\narg3 $args{arg3}\n";
