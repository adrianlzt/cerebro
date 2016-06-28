Las almacena en una base de datos sqlite3: ~/.config/chromium/Default/Cookies

Si esta locked, copiar el fichero a otro dir y leerlo allí.

Estan los valores encriptados:
http://n8henrie.com/2014/05/decrypt-chrome-cookies-with-python/o
https://gist.githubusercontent.com/n8henrie/8715089/raw/4e9db6c12ca11c99d04e1fe83e02123092d682db/pyCookieCheat.py

Copiado en este dir con algunas modificaciones


sqlite3 ~/.config/chromium/Default/Cookies
sqlite> .tables
sqlite> .schema cookies
CREATE TABLE cookies (
creation_utc INTEGER NOT NULL UNIQUE PRIMARY KEY,
host_key TEXT NOT NULL,
name TEXT NOT NULL,
value TEXT NOT NULL,
path TEXT NOT NULL,
expires_utc INTEGER NOT NULL,
secure INTEGER NOT NULL,
httponly INTEGER NOT NULL,
last_access_utc INTEGER NOT NULL,
has_expires INTEGER NOT NULL DEFAULT 1,
persistent INTEGER NOT NULL DEFAULT 1,
priority INTEGER NOT NULL DEFAULT 1,
encrypted_value BLOB DEFAULT '',
firstpartyonly INTEGER DEFAULT 0);
CREATE INDEX domain ON cookies(host_key);

sqlite> SELECT name,host_key,value FROM cookies LIMIT 2;
sqlite> SELECT name,host_key,value FROM cookies WHERE host_key LIKE "%google.com%" LIMIT 2;

sqlite> INSERT INTO cookies(creation_utc,host_key,name,value,path,expires_utc,secure,httponly,last_access_utc) VALUES(13085432902257802,".maria.com","micookie","valor","/",13716645902257802,1,1,13110363479524946);

Parece que si modifico o inserto una cookie no lo ve chrome hasta que no lo cierre y vuelva a abrir.
