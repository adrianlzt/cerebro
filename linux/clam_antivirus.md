Antivirus para linux

freshclam para actualizar la db.
En arch viene con un systemd timer para actualizarse diariamente.

clamscan para realizar escaneo.
Podemos ponerle un timer para realizar un scaneo semanal por ejemplo.

clamscan --suppress-ok-results --recursive=yes --fail-if-cvd-older-than=2 --max-filesize=100m PATH
