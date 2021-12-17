Reloj para correr.

Desde la web podemos saltar al detalle de las actividades desde https://connect.garmin.com/modern/report

Si exportamos en .tcx es un XML con los datos.

Sacar fecha y pulsaciones en formato:
2021-11-27T09:10:37.000Z,137

cat export_garmin.tcx| xq '.TrainingCenterDatabase.Activities.Activity.Lap.Track.Trackpoint[] | .Time,  .HeartRateBpm.Value' -r | paste -d ',' - - > garmin_bpm.data
