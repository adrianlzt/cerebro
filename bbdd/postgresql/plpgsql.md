https://www.postgresql.org/docs/current/plpgsql.html


BEGIN;
  DO $$
  DECLARE
    myid INTEGER := 10;
  BEGIN
    UPDATE mytable SET role = 'admin'
      WHERE userid = myid;
  END
  $$;
COMMIT;


Declarar una varible a partir de un update/insert/delete returning
DO $$
  DECLARE
    rid INTEGER;
BEGIN
  update ids set nextid = nextid + 1 where table_name = 'regexps' returning nextid into rid;
  insert into regexps values(rid, 'coso3');
END $$;




Ejemplo declarando lanzando una query y usándola como un condicional, todo wrapped en una tx:

BEGIN;
DO $$
  DECLARE
    rid INTEGER;
    eid INTEGER;
    regex integer;
    regex_name VARCHAR := 'Oracle tablespaces bisbis';

BEGIN

select regexpid into regex from regexps where name = regex_name;

if not found then
  update ids set nextid = nextid + 1 where table_name = 'regexps' returning nextid into rid;
  insert into regexps values(rid, regex_name);

  update ids set nextid = nextid + 1 where table_name = 'expressions' returning nextid into eid;
  insert into expressions values(eid, rid, 'mi expresion');

end if;

END $$;
COMMIT;




# Loop
https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-CONTROL-STRUCTURES-LOOPS


Iterando por un array de JSON
DO $$
  DECLARE
    rid INTEGER;
    eid INTEGER;
    regex integer;
    regex_name VARCHAR := 'Oracle tablespaces JSON2';
    expr json[] := ARRAY['{"foo": "bar"}','{"foo": "bar2"}'];
    e json;

BEGIN

select regexpid into regex from regexps where name = regex_name;

IF NOT FOUND THEN
  update ids set nextid = nextid + 1 where table_name = 'regexps' returning nextid into rid;
  insert into regexps values(rid, regex_name);

  FOREACH e IN ARRAY expr
  LOOP
    update ids set nextid = nextid + 1 where table_name = 'expressions' returning nextid into eid;
    insert into expressions values(eid, rid, e->>'foo');
  END LOOP;

END IF;
END $$;

