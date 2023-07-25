http://www.w3schools.com/sql/sql_orderby.asp

SELECT * FROM Customers
ORDER BY Country;

SELECT * FROM Customers
ORDER BY Country DESC;

SELECT * FROM Customers
ORDER BY Country,CustomerName;


https://www.javatpoint.com/sql-order-by-random
SELECT column FROM table ORDER BY RANDOM();
  para postgres


# postgres
-- NULL values placed first by rule
SELECT * FROM customers ORDER BY country ASC NULLS FIRST;

-- NULL values placed last by rule
SELECT * FROM customers ORDER BY country ASC NULLS LAST;

# mysql
-- NULL values placed first by rule
SELECT * FROM customers ORDER BY country IS NOT NULL, country ASC;

-- NULL values placed last by rule
SELECT * FROM customers ORDER BY country IS NULL, country ASC;
