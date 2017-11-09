https://www.postgresql.org/docs/9.3/static/functions-matching.html

select * from crags where country ~ '[A-Z]{3}';
  regex que haga match

select * from crags where country !~ '[A-Z]{3}';
  que el campo no haga match
