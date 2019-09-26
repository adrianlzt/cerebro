PREPARE myplan (int) AS SELECT * FROM employee where emp_id = $1;
EXECUTE myplan(2);

El plan se calcula en el PREPARE, por lo que luego siempre se ejecutará el mismo plan, independientemente de que valores pasemos.
