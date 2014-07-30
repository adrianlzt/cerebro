# http://perldoc.perl.org/functions/open.html
#
# For three or more arguments if MODE is |- , the filename is interpreted as a command to which output is to be piped, and if MODE is -| , the filename is interpreted as a command that pipes output to us
#

$script_name = "/usr/lib/nagios/plugins/check_tcp";
@args = ("-H", "google.com", "-p", "80");

$ENV{LC_ALL}  = 'C'; # ejecutar con locale system
if (!open ($fh, '-|', $script_name, @args))
{
  print STDERR "Cannot execute $script_name: $!";
  return;
}
while (my $line = <$fh>) {
  print $line;
}

