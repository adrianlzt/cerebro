# http://perldoc.perl.org/perlpod.html
#
# http://perldoc.perl.org/perlpodstyle.html
# Guia de estilo para escribir una pagina man
#
=head1 NAME

exec-nagios.px - execute nagios plugins from Collectd

=head1 SYNOPSIS

B<exec-nagios.px> [B<-conf> I<CONF_FILE>] [B<-ok> I<true>]

=head1 DESCRIPTION

This script allows you to use plugins that were written for Nagios with
collectd's C<exec-plugin>. If the plugin checks some kind of threshold, please
consider configuring the threshold using collectd's own facilities instead of
using this transition layer.

Options:

B<-conf> I<CONF_FILE>
        Read I<CONF_FILE> instead of I</etc/exec-nagios.conf>.

B<-ok> I<true>
        Print 'okay' notifications. By default are desactivated.

=cut

# etc, etc
