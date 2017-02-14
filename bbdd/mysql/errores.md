ERROR 126 (HY000): Incorrect key file for table

Falta de espacio en la partición /tmp
Monitorizar (watch -n 1 df -h) mientras ejecutemos la query problemática y veremos como /tmp se va llenando hasta llegar al 100%.
Tras fallar la query el espacio se libera de nuevo.
http://stackoverflow.com/questions/19003106/mysql-error-126-incorrect-key-file-for-table


No me deja hacer una query cuando meto una palabra. Es reservada? Meter entre ``
