En MySQL podemos definir el engine "Blackhole" en una tabla para silenciosamente dropear cualquier dato escrito.

En Postgres esto lo podemos replicar con triggers o con FDW (Foreign Data Wrappers)

# FDW
https://bitbucket.org/adunstan/blackhole_fdw

# extensión
https://paquier.xyz/postgresql-2/blackhole-extension/

# Trigger
create function blackhole () returns trigger as $$ begin return NULL; end; $$ language plpgsql;
create trigger dropall before insert on housekeeper for each row execute PROCEDURE blackhole();
  en versiones recientes podemos poner "execute FUNCTION" en vez de procedure (aunque procedure tambien vale)
