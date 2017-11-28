http://www.cyberciti.biz/faq/yum-history-command/

yum history
yum history list all

The history command allows an admin to access detailed information on the history of yum transactions that have been run on a system
Nos da los cambios que se han realizado mediante yum

Si queremos que con el list all no muestreel comando lanzado:
echo "history_list_view=cmds" >> /etc/yum.conf


yum history info NN
nos da más información de un yum en particular

yum history undo / redo / rollback
operaciones para deshacer/rehacer cambios

yum history undo N
  desacer ese cambio

yum history rollback N
  deshace todos los pasos hasta quedarnos en N

Info histórica de un paquete:
yum history package-list subscription-manager\*
