https://mariadb.com/kb/en/virtual-columns/


> CREATE TABLE person(id INT NOT NULL PRIMARY KEY, firstname VARCHAR(40), lastname VARCHAR(40), fullname VARCHAR(81) AS (CONCAT(firstname, ' ', lastname)));

> INSERT INTO person VALUES(1, 'John', 'Doe', '');

> show warnings;
Podemos omitirlo de forma segura

> SELECT * FROM person;



Persistent virtual columns
