Zabbix no procesa bien inserciones muy rápidas de un item en concreto.
Por como procesan los history syncers, si un elemento inserta muy rápido, se irá almacenando en la cache y posiblemente los history syncers saquen values más lentos por lo que se encolará indefinidamente en la caché.
Depende mucho del entorno, pero inserciones en menos de 100ms seguramente ya sea demasiado rápido.
