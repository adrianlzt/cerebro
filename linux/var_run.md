http://askubuntu.com/questions/303120/how-folders-created-in-var-run-on-each-reboot

/var/run puede ser tmpfs, entonces se borrará en cada reinicio.
cuidado al crear directorios ahí, tendremos que hacerlo cada vez que hagamos un start()
