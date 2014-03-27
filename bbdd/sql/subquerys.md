SELECT id, first_name 
FROM student_details 
WHERE first_name IN (SELECT first_name 
FROM student_details 
WHERE subject= 'Science');


SELECT p.product_name, p.supplier_name, (select order_id from order_items where product_id = 101) AS order_id 
FROM product p 
WHERE p.product_id = 101;
