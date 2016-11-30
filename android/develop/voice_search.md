https://developer.android.com/guide/components/intents-common.html#SearchOnApp
http://antonioleiva.com/voice_search_google_now/
http://stackoverflow.com/questions/26982653/how-to-integrate-searchable-activity-with-ok-google-voice-search

Yes, the app must be published to the Play Store in order for the feature to work. One way to help debug your end is to trigger the intent via adb, for example: adb shell am start -a com.google.android.gms.actions.SEARCH_ACTION -e query foo


Para buscar con la voz:
"OK google" "Search for foo in APP".
Ejemplo: "Search for climbing in Dropbox"
En español parece que no está disponible el comando.



Ejemplo de VLC: https://code.videolan.org/videolan/vlc-android/blob/master/vlc-android/src/org/videolan/vlc/gui/SearchActivity.java
