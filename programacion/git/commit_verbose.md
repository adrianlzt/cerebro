Activamos por defecto el mostrar los cambios al entrar en el editor del commit:
git config --global commit.verbose true


Si queremos deshabilitarlo:
git -c "commit.verbose=false" commit
