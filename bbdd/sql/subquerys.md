SELECT id, first_name 
FROM student_details 
WHERE first_name IN (SELECT first_name 
FROM student_details 
WHERE subject= 'Science');


SELECT p.product_name, p.supplier_name, (select order_id from order_items where product_id = 101) AS order_id 
FROM product p 
WHERE p.product_id = 101;


https://stackoverflow.com/a/949483/1407722
SELECT COUNT(*), SUM(SUBQUERY.AGE) from
(
  SELECT ...
) as SUBQUERY;


Correlated subquerys.
En la subquery se puede hacer referencia a la query superior: http://en.wikipedia.org/wiki/Correlated_subquery
SELECT employee_number, name
FROM employees AS Bob
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE department = Bob.department);



Ejemplo de una subquery triple de postgres.
En el select de en medio estamos sacando los servidores que pertenecen a un proyecto determinado (projects/monitoring).
En la más interna usamos esos resultados para contar cuantas incidencias tiene cada uno de los resultados de la query de en medio.
En el primer select sumamos los resultados (teniendo en cuenta que antes hemos hecho un substring para solo coger un cacho del nombre, por lo que varios server tendrán las mismas substrings)
SELECT a.substring, SUM(count) FROM (
  SELECT
     substring(h.host from '__(.*)\.\.'),
     (
       SELECT count(1)
         FROM triggers t,
           functions f,
           items i,
           problem p,
           hosts hh
         WHERE p.objectid=t.triggerid
           AND p.objectid=f.triggerid
           AND f.itemid=i.itemid
           AND p.r_eventid IS NULL
           AND p.source='0'
           AND p.object='0'
           AND i.hostid = hh.hostid
           AND hh.hostid = h.hostid) as count
     FROM
       hosts h,
       hosts_groups hg,
       groups g
     WHERE
       hg.hostid = h.hostid AND
       hg.groupid = g.groupid AND
       g.name like ('projects/monitoring%')
) a GROUP by a.substring;
