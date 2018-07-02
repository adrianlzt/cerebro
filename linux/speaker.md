https://wiki.archlinux.org/index.php/Disable_PC_speaker_beep_(Espa%C3%B1ol)

Deshabilitar el speaker del ordenador (el que hace los beeps):
echo "blacklist pcspkr" | sudo tee /etc/modprobe.d/nobeep.conf
