TRACE=:
if test "$1" = "-v"; then
    TRACE=echo
    shift
fi

$TRACE "You passed the -v option"
