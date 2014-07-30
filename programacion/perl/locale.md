http://perldoc.perl.org/perllocale.html#The-setlocale-function

# Import locale-handling tool set from POSIX module.
# This example uses: setlocale -- the function call
#                    LC_CTYPE -- explained below
use POSIX qw(locale_h);
# query and save the old locale
$old_locale = setlocale(LC_CTYPE);
setlocale(LC_CTYPE, "fr_CA.ISO8859-1");
# LC_CTYPE now in locale "French, Canada, codeset ISO 8859-1"
setlocale(LC_CTYPE, "");
# LC_CTYPE now reset to default defined by LC_ALL/LC_CTYPE/LANG
# environment variables.  See below for documentation.
# restore the old locale
setlocale(LC_CTYPE, $old_locale);
