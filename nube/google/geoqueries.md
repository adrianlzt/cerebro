https://medium.com/@codyzus/cloud-firestore-geo-queries-a0e095b781c6
https://fireship.io/lessons/geolocation-query-in-firestore-realtime/

Firestore no tiene implementado directamente geoqueries.
Hacen uso de geohashes para almacenar un cuadrado de la posición
https://firebase.google.com/docs/firestore/solutions/geoqueries

Una opción, vista en , es usar https://www.algolia.com/doc/
Ponemos una cloud function que sincroniza los datos de firebase con algolia y hacemos las geoqueries directamente a algolia.

El free plan
Forever free
No credit card required
10,000 Records
10,000 Search requests/mo
10,000 Recommend requests/mo


Con la Realtime database si parece que lo tienen: https://firebase.googleblog.com/2014/06/geofire-20.html
Esta está pensado para que sea la app final quien se subscriba y dispare un trigger en caso de que la geoquerie devuelva un resultado.
