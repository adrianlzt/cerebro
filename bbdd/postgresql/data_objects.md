Tables
Views
Functions
Trigger functions
Types
  mirar data_types.md
Sequences
Functions



# Domains
https://www.postgresql.org/docs/current/sql-createdomain.html

Como data_types pero con un where.

Ejemplos:
  strings con símbolo @
  números mayores que un millón

La idea viene de Tedd Codd (bases de datos relacionales).
La realidad es que nadie prácticamente lo usa.

Lo podemos usar para asegurar los tipos de datos que van en una columna.


CREATE DOMAIN us_postal_code AS TEXT
CHECK(
  VALUE ~ '^\d{5}$'
  OR VALUE ~ '^\d{5}-\d{4}$'
);
