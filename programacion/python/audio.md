pip install pyalsaaudio

Ejemplos:
https://github.com/larsimmisch/pyalsaaudio/



Reproducir sonido con mplayer:
https://github.com/baudm/mplayer.py

pip install mplayer.py

No me funciona, al hacer el import:
KeyError: u'2.0-728-g2c378c7-4+b1'


# Librerías para trabajar con audio
wave (stdlib)
librosa
pytorch audio


## wave
Leer y escribir ficheros wav

### Leer
with wave.open("listen-1707072692.2361145.wav", "rb") as f:
  audio = f.readframes(f.getnframes())

### Escribir
with wave.open("foo.wav", 'wb') as f:
    f.setnchannels(1)
    f.setsampwidth(1) # 8 bit
    f.setframerate(8000)
    f.writeframes(audio)



### Convertir a numpy
https://stackoverflow.com/a/66296546

Un audio 8 bits y 8khz (creo que esto es válido, al menos whisper lo interpretaba bien):
np.frombuffer(audio, dtype=np.uint8, count=len(audio), offset=0)


## soundfile https://python-soundfile.readthedocs.io/

Subtipos de ficheros para un tipo determinado:
import soundfile as sf
sf.available_subtypes('wav')
sf.available_subtypes('raw')

Leer bytes de un formato raw 16khz 16 bits y generar un numpy array tipo float32
waveform, samplerate = sf.read(file=io.BytesIO(audio_bytes), dtype='float32', format='RAW', samplerate=16000, channels=1, subtype='PCM_16')

Obtener un SoundFile a partir de bytes raw 16khz, 16 bit
audio_sf = sf.SoundFile(file=io.BytesIO(audio_bytes), format='RAW', samplerate=16000, channels=1, subtype='PCM_16')

Podemos luego guardarlo cambiando el subtype:
sf.write("prueba_piper_8k_8b.wav", waveform, 16000, subtype="PCM_U8")

El samplerate debe coincidir.
Si queremos modificar el samplerate podemos usar:
import resampy
waveform_8khz = resampy.resample(waveform, 16000, 8000)
