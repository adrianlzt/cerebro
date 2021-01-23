PREPARE myplan (int) AS SELECT * FROM employee where emp_id = $1;
EXECUTE myplan(2);

El plan se calcula en el PREPARE, por lo que luego siempre se ejecutará el mismo plan, independientemente de que valores pasemos.


Mejoras:
Prepared statements potentially have the largest performance advantage when a single session is being used to execute a large number of similar statements. The performance difference will be particularly significant if the statements are complex to plan or rewrite, e.g., if the query involves a join of many tables or requires the application of several rules. If the statement is relatively simple to plan and rewrite but relatively expensive to execute, the performance advantage of prepared statements will be less noticeable.

No compatible con pgbouncer (excepto en modo session)
