Cuidado si tenemos que reiniciar con dos cosas.
 - si tenemos elementos en la write cache, no parará hasta vaciar la cache. Sobre todo, si tenemos algunos pocos elementos con muchos items en la cache, esto puede llevar mucho tiempo
 - sincronización de trends. Antes de parar calculará los trends y los enviará a la bbdd. Esto puede llevar mucho tiempo, limitado por la velocidad a la que la bbdd acepte los updates, inserts y selects

Esta full sync se hace en la función: DCsync_all


Los items calculated, durante el tiempo del reinicio, se perderán.
