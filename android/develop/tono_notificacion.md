# Hace sonar el ruidito de notificacion que tengamos por defecto
http://stackoverflow.com/questions/2618182/how-to-play-ringtone-alarm-sound-in-android

Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), notification);
r.play();




# Hace sonar un "beep"
https://developer.android.com/reference/android/media/ToneGenerator.html
Como suenan: http://android-er.blogspot.fr/2014/12/sound-samples-generated-by.html

final ToneGenerator tg = new ToneGenerator(AudioManager.STREAM_NOTIFICATION, 100);
tg.startTone(ToneGenerator.TONE_PROP_BEEP);

Hay un montón de tonos disponibles.
TONE_PROP_ACK
Este por ejemplo son dos tonos más agudos seguidos.
