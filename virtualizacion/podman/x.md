# X
podman run --net host -it -u 0 -e DISPLAY="$DISPLAY" -v ~/.Xauthority:/root/.Xauthority:Z docker.io/archlinux
  > pacman -Sy && pacman -Ss xorg-xeyes && xeyes
