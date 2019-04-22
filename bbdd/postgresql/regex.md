https://www.postgresql.org/docs/9.3/static/functions-matching.html

Regex POSIX:
select * from crags where country ~ '[A-Z]{3}';
  regex que haga match

select * from crags where country !~ '[A-Z]{3}';
  que el campo no haga match


SIMILAR TO
Es una mezcla entre LIKE y regex de POSIX


En los select
substring('foobar' from '%#"o_b#"%' for '#')   oob

