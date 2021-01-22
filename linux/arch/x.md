Sistema gráfico:
pacman -S xorg

Parece que Xorg puede funcionar root less, pero no funciona bien con i3

Portatil con nvidia
pacman -S xf86-video-nouveau
reboot

Parece que me da problemas con na nvidia geforce gtx, probando con:
pacman -S nvidia opencl-nvidia nvidia-settings
pacman -R xf86-video-nouveau
  nvidia-lts es para usar con el kernel linux-lts

Para HP envy-15-ep0004ns, me funciona tanto la pantalla del portatil como el HDMI con:
Linux 5.4.91-1-lts
nvidia-lts 1:460.32.03-5
nvidia-utils 460.32.03-1
xf86-video-intel 1:2.99.917+916+g31486f40-1




Portatil con intel:
pacman -S xf86-video-intel



pacman -S i3-wm lightdm lightdm-gtk-greeter
systemctl enable lightdm
systemctl start lightdm

mirar fonts.md
