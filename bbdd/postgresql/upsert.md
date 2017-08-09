https://www.postgresql.org/docs/devel/static/sql-insert.html

INSERT INTO the_table (id, column_1, column_2) 
VALUES (1, 'A', 'X'), (2, 'B', 'Y'), (3, 'C', 'Z')
ON CONFLICT (id) DO UPDATE 
  SET column_1 = excluded.column_1, 
      column_2 = excluded.column_2;

INSERT INTO ascensions VALUES (12341,'Enero',22) ON CONFLICT (crag_id, month) DO UPDATE SET count = EXCLUDED.count;
// count es la columna donde queremos poner el 22
