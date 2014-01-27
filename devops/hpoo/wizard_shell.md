$HPOO/studio/tools/shell-wizard.bat

Tenemos que decirle donde creará el nuevo flujo.

Tras poner nuestras credenciales nos abrirá una terminal shell donde nos permitirá ir metiendo comandos, e ir creando un paso por cada comando.
Al entrar al Studio de nuevo veremos que nos habrá creado un step por cada uno que hayamos creado.
Viendo el command, veremos que envía comandos, y hace expect para esperar a un resultado (o a la shell).

Como resultados nos dará el stdout y stderr, que podremos usar en el siguiente step.

La sesión ssh se mantiene abierta.
