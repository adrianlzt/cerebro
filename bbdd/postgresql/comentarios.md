https://www.postgresql.org/docs/current/sql-comment.html

Comentario asociado a una tabla
COMMENT ON TABLE "public"."item_condition" IS E'@name itemConditionOrig';

Obtener el comentario:
\d+
SELECT obj_description('public.myTable'::regclass) FROM pg_class WHERE relkind = 'r' limit 1;


En columnas:
comment on column session_log.userid is 'The user ID';

Para ver el comentario en una columna:
\d+ tabla




-- comentario en un .sql o transacción
/* esto tambien vale */
/* y esto tambien
 * vale
 */
