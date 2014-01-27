// Nos puede servir para hacer pruebas de carga, haciendo peticiones get pi.php?n=100 con un n mas grande para cargar mas la maquina
<?php
$pi = 4; $top = 4; $bot = 3; $minus = TRUE;
$accuracy = $_GET["n"];

for($i = 0; $i < $accuracy; $i++)
{
  $pi += ( $minus ? -($top/$bot) : ($top/$bot) );
  $minus = ( $minus ? FALSE : TRUE);
  $bot += 2;
}
print "Pi ~=: " . $pi;
?>

