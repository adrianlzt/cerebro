Activar el logging de todas las queries:
SHOW VARIABLES LIKE "general_log%";
  para ver el estado actual y donde está el fichero donde se va a guardar
SET GLOBAL general_log = 'ON';
  activar guardar todas las queries.
  IMPACTA la performance mucho y llena el disco!
