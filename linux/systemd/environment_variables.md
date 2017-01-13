https://www.freedesktop.org/software/systemd/man/systemd.exec.html#EnvironmentFile=
http://www.alaux.net/articles/systemd-unit-files-and-environment-variables

Si en el environment file la variable tiene espacios, pero son distintos parametros, usaremos $VAR.
Si queremos que se pase como una única string ${VAR}


Environment="ONE=one" 'TWO=two two'
ExecStart=/bin/echo $ONE $TWO ${TWO}
This will execute /bin/echo with four arguments: "one", "two", "two", and "two two".
