http://www.linuxjournal.com/article/8919
Variable Mangling in Bash with String Operators

$ export foo="this is a test"
$ echo ${foo#t*is}
is a test
$


$ export foo="this is a test"
$ echo ${foo##t*is}
a test
$


$ export foo="this is a test"
$ echo ${foo%t*st}
this is a
$


$ export foo="this is a test"
$ echo ${foo%%t*st}

$
