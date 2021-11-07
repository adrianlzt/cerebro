https://www.gnu.org/software/gettext/manual/html_node/Locale-Environment-Variables.html
A locale is composed of several locale categories, see Aspects. When a program looks up locale dependent values, it does this according to the following environment variables, in priority order:

LANGUAGE
LC_ALL
LC_xxx, according to selected locale category: LC_CTYPE, LC_NUMERIC, LC_TIME, LC_COLLATE, LC_MONETARY, LC_MESSAGES, ...
LANG

LANGUAGE es para dar prioridad a unas lenguas sobre otras, pero hace falta tener definidas las LC_...
Si LC pone su valor a "C", LANGUAGE será ignorada.


LC_ALL=c
It forces applications to use the default language for output, and forces sorting to be bytewise.
There is also a special locale, called ‘C’. When it is used, it disables all localization: in this locale, all programs standardized by POSIX use English messages and an unspecified character encoding (often US-ASCII, but sometimes also ISO-8859-1 or UTF-8, depending on the operating system).

$ LC_ALL=es_ES man
¿Qué página de manual desea?
$ LC_ALL=C man
What manual page do you want?

Mensajes en ingles:
$ LANG=en_US comando


https://wiki.archlinux.org/index.php/Locale#Setting_system-wide_locale
