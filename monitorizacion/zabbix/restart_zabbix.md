Cuidado si tenemos que reiniciar con dos cosas.
 - si tenemos elementos en la write cache, no parará hasta vaciar la cache. Sobre todo, si tenemos algunos pocos elementos con muchos items en la cache, esto puede llevar mucho tiempo
 - sincronización de trends. Antes de parar calculará los trends y los enviará a la bbdd. Esto puede llevar mucho tiempo, limitado por la velocidad a la que la bbdd acepte los updates, inserts y selects

Una buena estrategía parece que puede ser reiniciar tras la generación de trends (a en punto), cuando la write cache se haya recuperado.
