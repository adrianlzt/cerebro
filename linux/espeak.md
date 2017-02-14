pacman -S espeak

espeak "hola"
  Reproduce la palabra que le pasemos.

# Python
https://github.com/relsi/python-espeak
import espeak
es = espeak.ESpeak()
es.voice = 'es'
es.speed = 1
es.say("esto es algo")




# Festival
https://wiki.archlinux.org/index.php/Festival#Usage_with_a_Sound_Server
Mejor el festival:
pacman -S festival

Para español meter: http://www.cstr.ed.ac.uk/downloads/festival/1.95/festvox_ellpc11k.tar.gz
mv festvox_ellpc11k.tar.gz festvox_ellpc11k.tar
tar xvf festvox_ellpc11k.tar
sudo mv festival/lib/voices/spanish /usr/share/festival/voices/

$ cat .festivalrc
(Parameter.set 'Audio_Required_Format 'aiff)
(Parameter.set 'Audio_Method 'Audio_Command)
(Parameter.set 'Audio_Command "paplay $FILE --client-name=Festival --stream-name=Speech")


$ festival
festival> (voice_el_diphone)
el_diphone
festival> (SayText '"hola me llamo maquina")
#<Utterance 0x7f7bf9c185d0>
festival>


