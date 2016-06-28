$ psql -v variable=123
psql (8.4.20)
Type "help" for help.

postgres=# select :variable;
 ?column? 
----------
      123
(1 row)



postgres=# \set variable 123
postgres=# select :variable;
 ?column? 
----------
      123
(1 row)


Para pasar una cadena de texto lo haremos con este esquema de dobles comillas:
$ psql -v env="'pre'" monitoring
monitoring=# select check_args(:env, ':old_proj', ':new_proj');
 check_args 
 ------------
  pre
  (1 row)
