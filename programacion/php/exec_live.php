# http://stackoverflow.com/questions/20107147/php-reading-shell-exec-live-output

<?php

$cmd = "/tmp/prueba.sh 2>&1";
#Redirigir la stdout a stderr porque solo se mostrara stdout

while (@ ob_end_flush()); // end all output buffers if any

$proc = popen($cmd, 'r');
echo '<pre>';
while (!feof($proc))
{   
    echo fread($proc, 4096);
    @ flush();
}
echo '</pre>';

?>
