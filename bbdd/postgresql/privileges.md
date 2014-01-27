\dp para mostrar privilegios de tablas y columnas
\l para mostrar privilegios de bases de datos

      rolename=xxxx -- privileges granted to a role
              =xxxx -- privileges granted to PUBLIC

                  r -- SELECT ("read")
                  w -- UPDATE ("write")
                  a -- INSERT ("append")
                  d -- DELETE
                  D -- TRUNCATE
                  x -- REFERENCES
                  t -- TRIGGER
                  X -- EXECUTE
                  U -- USAGE
                  C -- CREATE
                  c -- CONNECT
                  T -- TEMPORARY
            arwdDxt -- ALL PRIVILEGES (for tables, varies for other objects)
                  * -- grant option for preceding privilege

              /yyyy -- role that granted this privilege

Para gestionar los permisos:
http://www.postgresql.org/docs/8.4/interactive/sql-grant.html

Ejemplos:
GRANT SELECT ON mytable TO PUBLIC;
GRANT SELECT, UPDATE, INSERT ON mytable TO admin;
GRANT SELECT (col1), UPDATE (col1) ON mytable TO miriam_rw;
