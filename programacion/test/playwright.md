<https://playwright.dev/>

Controlar el navegador con python u otros lenguajes.

<https://pypi.org/project/tf-playwright-stealth/>
This is a package that makes playwright stealthy like a ninja by spoofing browser features in order to reduce the chance of detection.

# Arch linux

<https://blog.nicoandres.dev/use-playwright-in-arch-linux/>

```
sudo pacman -S --needed core/nss core/nspr extra/at-spi2-core extra/libcups extra/libdrm core/dbus extra/libxcb extra/libxkbcommon extra/at-spi2-core extra/libx11 extra/libxcomposite extra/libxdamage extra/libxext extra/libxfixes extra/libxrandr extra/mesa extra/pango extra/cairo extra/alsa-lib extra/xorg-server-xvfb

yay playwright

playwright install
```

Una vez hecho eso, ya podemos usar, por ejemplo, una app de python que use playwright.

Si instalo playwright con pip, parece que falla. Versión más reciente?

# Using already open browser

<https://medium.com/@testerstalk/how-to-connect-playwright-test-with-already-opened-browser-33c4e3fb1e97>

Un scriptillo en go que hice: <https://github.com/netr0m/az-pim-cli/issues/87>

Cuando tengo muchas pestañas abiertas (tenía dos sesiones), no funciona playwright.
Empieza a consumir mucha CPU y al final da timeout.
El go con chromdp si funciona bien siempre.

No tengo claro porque playwright mcp siempre intenta interactuar con una pestaña determinada, en vez de con la primera que encuentre o abrir una nueva.
Pero puedo elegir abrir una nueva pestaña.

```bash
chrome --remote-debugging-port=9222
```

## Node

```js
import { test, expect, chromium } from '@playwright/test';

test('Run test in already opened browser', async() =>{
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[0];

    await page.goto('https://www.google.com/search?q=playwright+by+testers+talk');
    await page.getByRole('link', { name: 'Playwright by Testers Talk' }).first().click();
});
```

```bash
npm install --save-dev @playwright/test && npx playwright test spec.spec.js
```
