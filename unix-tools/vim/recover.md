Instalado el plugin:
https://github.com/chrisbra/recover.vim

Nos da la opcion de comparar los ficheros.
A la derecha el swap file.

Si queremos quedarnos con el swap file, ejecutar el comando:
:FinishRecovery
Cerrará el swap con el fichero original, copiará el swap a la ventana de trabajo y borrará el fichero de swap.

Para quedarnos con la ventana de la izquierda (lo que está en disco):
:RecoveryPluginGet


Comandos para el diff: https://stackoverflow.com/a/31686752
]c  siguiente cambio
do  traerse cambios de la otra ventana a esta
