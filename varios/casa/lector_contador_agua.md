Hay varias razones por las que el contador de agua puede leer erróneamente.



averagewall
A bit off topic but I once had a water meter that was overcharging by perhaps around 100%. I worked out that it was because it didn't have a one-way valve. When there was air trapped in the pipes, pressure fluctuations would cause water would move back and forth through the meter, racking up the bill with no net flow.
People should test their own meters which isn't that hard if you're careful and know the basic concepts of thermostats and power ratings.



Gibbon1
Most cheap meters have a magnet and a reed-switch to generate pulses. As you noted they will generate pulses with backflow. However the dial count on the meter is correct.
Another issue that can come up is older reed switches can chatter as they close and open. Usually input debouncing eliminates that, if the firmware guy didn't screw it up.
Another thing I've seen is sometimes in a meter the magnet will rock back and forth. Careful design is needed to prevent that from causing the reed switch to open and close constantly. (Deboucing won't save you there)
Besides that another thing that happens is if utility selects the wrong scale factor for the meter. That's good for really angry customers if the error is in the utilities favor. If it's in the customers favor they get angry when the utility fixes it.
More sophisticated meters actually sense the actual meter reading using a bizarre electromagnetic sensing technique.



phil21
Interesting. I also had this happen, where the water company installed the wrong size meter for the size pipe in my unit.
Luckily it was a relatively small suburb, so the lady on the other end of the phone was able to give me her personal e-mail I could send a video to her of me test filling a gallon jug of milk while video taping the meter.
That got their attention finally, and I was being billed about 5x the real usage rate.
It was a fun one especially because I had moved into the apartment and immediately traveled for work at 80% time for 3 months. By the time I was home enough to notice the huge bills it took some convincing :)



En mi casa de Grenoble el contador tambien mide mal. Cuando se cierra el agua de golpe el contador tiene inercia y sigue girando durante un corto periodo.
Llenando una botella a base de golpes de grifo (esperando unos 4 segundos entre cierre y apertura) el contador registra el doble (registró 1L cuando había llenado 0.5L en la botella).
No se si esto es por la inercia del contador (que esté mal diseñado) o por el efecto Golpe de Ariete (se escucha al cerrar de golpe) donde las ondas de presión hagan que se mida.

