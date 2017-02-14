https://learn.perl.org/examples/read_write_file.html

Leer fichero en una variable
open FILE, "myfile" or die "Couldn't open file: $!";
$string = <FILE>;
close FILE;


Usar mejor el módulo slurp:
File::Slurp
my $dir = dir("/tmp"); # /tmp
my $file = $dir->file("file.txt");
# Read in the entire contents of a file
my $content = $file->slurp();


Leer empezando por el final
http://search.cpan.org/~uri/File-ReadBackwards-1.05/ReadBackwards.pm
