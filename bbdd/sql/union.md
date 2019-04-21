Nos da los elementos distintos de tableA y tableB (si hay una entrada repe en tableA, solo saldrá una vez)
select a,b,c from tableA
union
select a,b,c from tableB;

Si queremos todos los resultados (sin hacer distinct) podemos usar "UNION ALL"
