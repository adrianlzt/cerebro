https://stackoverflow.com/questions/9156340/how-to-copy-a-row-and-insert-in-same-table-with-a-autoincrement-field-in-mysql

insert into your_table (c1, c2, ...)
select c1, c2, ...
from your_table
where id = 1
