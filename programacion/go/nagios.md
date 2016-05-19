Mas recursos: https://golanglibs.com/dig_in/go-nagios


https://github.com/olorin/nagiosplugin

Lib para crear plugins de nagios


check.AddResult(nagiosplugin.UNKNOWN, "error parsing warning range")

Si queremos meter formato
check.AddResultf(nagiosplugin.UNKNOWN, "error parsing warning range %s", var)
