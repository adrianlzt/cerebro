https://stackoverflow.com/a/367167

Si ponemos "!" delante de un comando, cambiaremos el RC, 1=>0, 0=>1

$ ! some-command succeed; echo $?
1
$ ! some-command fail | some-other-command fail; echo $?
0
$ ! some-command < succeed.txt; echo $?
1
