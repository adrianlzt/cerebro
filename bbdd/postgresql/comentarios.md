COMMENT ON TABLE "public"."item_condition" IS E'@name itemConditionOrig';


SELECT obj_description('public.myTable'::regclass) FROM pg_class WHERE relkind = 'r' limit 1;


-- comentario en un .sql o transacción
/* esto tambien vale */
