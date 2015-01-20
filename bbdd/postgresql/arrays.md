http://www.postgresql.org/docs/9.3/static/functions-array.html

# select string_to_array('ftp,dns',',');
 string_to_array
 -----------------
 {ftp,dns}


Mirar si un array contiene un elemento:
SELECT * FROM elementos WHERE ARRAY['viphost'] <@ tags;
Miramos si en el array tags está el elemento 'viphost'
