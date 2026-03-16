# vocalinux

https://github.com/jatinkrmalik/vocalinux

Voice to text

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📦 What Was Installed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Application:    Vocalinux (voice dictation for Linux)
  Engine:         Whisper.cpp
  Backend:        CPU
  Location:       /home/adrian/.local/share/vocalinux-install
  Virtual Env:    /home/adrian/.local/share/vocalinux/venv
  Config:         /home/adrian/.config/vocalinux

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🚀 Getting Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Launch Vocalinux
   • From app menu: Look for 'Vocalinux'
   • From terminal: Run 'vocalinux' command

2. Find the icon in your system tray (top bar)
   • Click for settings and status
   • Right-click for menu options

3. Start dictating!
   Double-tap Ctrl anywhere to toggle recording

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎤 Testing Your Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open any text editor (gedit, VS Code, LibreOffice, etc.)
2. Double-tap Ctrl to start recording
3. Say: 'Hello world period'
4. Double-tap Ctrl to stop
5. You should see: 'Hello world.'

💡 Voice commands: 'period' 'comma' 'new line' 'delete that'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔧 Managing Vocalinux
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Commands:
  vocalinux              Start the application
  vocalinux --debug      Start with debug logging
  vocalinux-gui          Open settings GUI

To activate the virtual environment:
  source /home/adrian/.local/bin/activate-vocalinux.sh

To uninstall:
  ./uninstall.sh
```

# espeak
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
