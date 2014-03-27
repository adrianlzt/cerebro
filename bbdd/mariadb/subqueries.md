SELECT fullname, phone
FROM (SELECT id, COUNT(*) phone_cnt
FROM person LEFT JOIN phone
ON person.id = phone.personid
GROUP BY id) AS person_phone
JOIN person ON person_phone.id = person.id
JOIN phone ON person.id = phone.personid
WHERE phone_cnt > 1;

No es muy eficiente.
