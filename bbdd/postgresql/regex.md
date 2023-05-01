https://www.postgresql.org/docs/9.3/static/functions-matching.html

Regex POSIX:
select * from crags where country ~ '[A-Z]{3}';
  regex que haga match

select * from crags where country !~ '[A-Z]{3}';
  que el campo no haga match


SIMILAR TO
Es una mezcla entre LIKE y regex de POSIX


En los select
substring('foobar' from 'o.b')     oob


Replace/substring con regexp
SELECT regexp_matches('foobarbequebaz', '(bar)(beque)');
nos devuelve un array con dos elementos


regexp_replace('foobarbaz', 'b(..)', 'X\1Y', 'g')
                                   fooXarYXazY


Ejemplo modificando un campo basándonos en el resultado de una regex en otro campo:
WITH macro AS (
    SELECT
        itemid,
        (regexp_matches(key_, '(\{#[^\}]*\})'))[1] AS m
    FROM
        items)
UPDATE
    items
SET
    name = regexp_replace(name, '(\$1)', macro.m)
FROM
    macro
WHERE
    macro.itemid = items.itemid;
