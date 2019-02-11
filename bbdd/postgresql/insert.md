http://www.postgresql.org/docs/8.4/static/sql-insert.html

INSERT INTO tabla(col1,col2) VALUES('valor1',3);
INSERT INTO tabla(col1,col2) VALUES('valor1',3),('valor2',10);

NOTA: Debe ir entre comillas simples!


# INSERT - SELECT
https://stackoverflow.com/questions/6083132/postgresql-insert-into-select
INSERT INTO tblA
    SELECT id, time ...
