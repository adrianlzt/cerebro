Activamos explain para todo
```sql
SET AUTOTRACE ON;
SET AUTOTRACE TRACEONLY EXPLAIN; -- TRACEONLY es para esconder los datos devueltos
```

Para desactivarlo:
```sql
SET AUTOTRACE OFF;
```

Podemos también meterlo en cada query:
```sql
SELECT /*+ GATHER_PLAN_STATISTICS */ * FROM orders
WHERE customer_id = 42;
```
