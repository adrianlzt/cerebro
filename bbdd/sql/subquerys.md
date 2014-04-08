SELECT id, first_name 
FROM student_details 
WHERE first_name IN (SELECT first_name 
FROM student_details 
WHERE subject= 'Science');


SELECT p.product_name, p.supplier_name, (select order_id from order_items where product_id = 101) AS order_id 
FROM product p 
WHERE p.product_id = 101;


Correlated subquerys.
En la subquery se puede hacer referencia a la query superior: http://en.wikipedia.org/wiki/Correlated_subquery
SELECT employee_number, name
FROM employees AS Bob
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE department = Bob.department);
