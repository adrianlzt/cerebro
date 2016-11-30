https://www.sitepoint.com/using-android-text-to-speech-to-create-a-smart-assistant/

Haciendo unas pruebas me tardaba 10" en oirse la voz (creando el objeto tts desde 0), aunque la traza de log que se ejecutaba tras .speak() salia inmediatamente.
Tambien pasa que si se cierra la Activity (con finish()) antes de esos 10", nunca sonara el sonido

Version 5.0 (API Level 21) en adelante. Si no, tendremos que hacer algunos cambios: http://stackoverflow.com/questions/4652969/android-tts-onutterancecompleted-callback-isnt-getting-called


Como manejar que se envien comandos antes de que se haya inicializado. Creo que esto vale
http://stackoverflow.com/questions/38976808/android-wait-until-text-to-speech-oninit-is-called


	private TextToSpeech tts;
    ...
    protected void onCreate(Bundle savedInstanceState) {
        ...
        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status == TextToSpeech.SUCCESS) {
                    Log.e("TTS", "Initilization Success!");
                    /*
                    // Definirlo si queremos cambiar el default
                    int result = tts.setLanguage(Locale.US);
                    if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                        Log.e("TTS", "This Language is not supported");
                    }
                    */

                    Bundle params = new Bundle();
                    params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "");
                    tts.speak("Shortcut " + shortcutName + " executed", TextToSpeech.QUEUE_FLUSH, params, "37556324-c780-4b82-bb0a-a5be26890988");
                    Log.d("TTS", "Saying: Shortcut " + shortcutName + " executed");
                } else {
                    Log.e("TTS", "Initilization Failed!");
                }
            }
        });

        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {
                Log.d("TTS", "Started talking: " + utteranceId);
            }

            @Override
            public void onDone(String utteranceId) {
                Log.d("TTS", "Finished talking: " + utteranceId);
                finish();
            }

            @Override
            public void onError(String utteranceId) {
                Log.e("TTS", "Error talking: " + utteranceId);
            }
        });
