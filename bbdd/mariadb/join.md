SELECT fullname, phone, area
FROM person JOIN phone ON person.id = phone.personid;


Tambien soportan OUTER JOIN using SQL-92
SELECT fullname, phone, area
FROM person LEFT JOIN phone ON person.id = phone.personid;
