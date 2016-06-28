#!/bin/bash
# choose pinentry depending on PINENTRY_USER_DATA
# requires pinentry-curses and pinentry-gtk2
# this *only works* with gpg 2
# see https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=802020

case $PINENTRY_USER_DATA in
gtk)
  exec /usr/bin/pinentry-gtk-2 "$@"
  ;;
gnome3)
  exec /usr/bin/pinentry-gnome3 "$@"
  ;;
qt)
  exec /usr/bin/pinentry-qt "$@"
  ;;
curses)
  exec /usr/bin/pinentry-curses "$@"
  ;;
*)
  exec /usr/bin/pinentry-tty "$@"
esac

