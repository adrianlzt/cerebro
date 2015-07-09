https://bbs.archlinux.org/viewtopic.php?id=78569

aur/localepurge 0.7.3.4-1 (217)
    Script to remove disk space wasted for unneeded localizations.

packer -S localepurge

sudo vi /etc/locale.nopurge

Comentar la linea (para poder ejecutar el programa):
NEEDSCONFIGFIRST

Dejar estas locales al final:
en
en_GB
es
es_ES
es_ES@euro  
es_ES.UTF-8


sudo localepurge
