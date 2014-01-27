insert data from select

insert into table_2 (itemid,location1) 
select itemid,quantity from table_1 where locationid=1

Si vamos a insertar el mismo numero de elementos que tiene la tabla de destino, no hace falta indicar nada
insert into tabla select cosa1,cosa2 from tabla2;
