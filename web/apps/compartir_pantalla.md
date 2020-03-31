https://opentokdemo.tokbox.com/
https://opentokrtc.com/

https://meet.jit.si/
  jitsi.org permite construir encima tu app, open source

https://openvidu.io/
  para montar tu app encima. Ciertas features son de pago
  https://news.ycombinator.com/item?id=22607065

https://meet.tokbox.com/NOMBRE
  permite compartir pantalla

appear.in.md -> appear.in
talky.md -> talky.io

zoom.us
  de pago, pero 40' gratis

BigBlueButton
  I'd say that the whole interface is useful only for smaller groups up to 10 persons, definitely not above 100 persons

Discusiones sobre las distintas plataformas
https://news.ycombinator.com/item?id=22607065
https://news.ycombinator.com/item?id=22669968


Hosting cost is the biggest barrier to building a video conferencing solution which scales to millions of users. We setup a Jitsi meet instance and with just 6 parties it pegged a core on the server CPU at 50%.

Bandwidth and processing power are limiting factors. Our department tried to run a large Big Blue Button instance to support a dozen of conferences at the same time, ranging from 10-150 participants, all day long.
The experience says: you need hardware (not virtual), starting from 32 cores and 64GB RAM, it turned out it was not enough, added another machine, then another machine, ... and more.
