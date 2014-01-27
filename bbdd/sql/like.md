SELECT name,city FROM users WHERE name LIKE 'a%';

El guión bajo se substituye por cualquier caracter
SELECT * FROM Customers WHERE City LIKE '_erlin';

Cualquier ciudad que empieze por 'b','s' o 'p'
SELECT * FROM Customers WHERE City LIKE '[bsp]%';

Cualquier ciudad que empieze por 'a', 'b' o 'c'
SELECT * FROM Customers WHERE City LIKE '[a-c]%';

Cualquier ciudad que NO empieze por 'b','s' o 'p'
SELECT * FROM Customers WHERE City LIKE '[!bsp]%';
