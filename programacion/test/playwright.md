<https://playwright.dev/>

Controlar el navegador con python u otros lenguajes.

<https://pypi.org/project/tf-playwright-stealth/>
This is a package that makes playwright stealthy like a ninja by spoofing browser features in order to reduce the chance of detection.

## Arch linux

<https://blog.nicoandres.dev/use-playwright-in-arch-linux/>

```
sudo pacman -S --needed core/nss core/nspr extra/at-spi2-core extra/libcups extra/libdrm core/dbus extra/libxcb extra/libxkbcommon extra/at-spi2-core extra/libx11 extra/libxcomposite extra/libxdamage extra/libxext extra/libxfixes extra/libxrandr extra/mesa extra/pango extra/cairo extra/alsa-lib extra/xorg-server-xvfb

yay playwright

playwright install
```

Una vez hecho eso, ya podemos usar, por ejemplo, una app de python que use playwright.

Si instalo playwright con pip, parece que falla. Versión más reciente?
