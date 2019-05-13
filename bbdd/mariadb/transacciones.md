begin;
insert ...
commit;

Tambien podemos hacer:
set autocommit=off;
insert ...;
commit;


Ver transacciones abiertas (nos mostrará la query en ejecución si es que hay una corriendo en ese momento):
show engine innodb status\G
  mirar en "TRANSACTIONS"

Otra forma:
SELECT * FROM information_schema.innodb_trx\G

