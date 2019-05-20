https://evertpot.com/http/103-early-hints

El servidor envia una respuesta tipo:
HTTP/1.1 103 Early Hints
Link: </style.css>; rel=preload; as=style
Link: </script.js>; rel=preload; as=script

Antes incluso de que le envie la respuesta al GET.

Parece que Chrome aún no lo soporta (Mayo'19).
https://bugzilla.mozilla.org/show_bug.cgi?id=1407355
https://bugs.chromium.org/p/chromium/issues/detail?id=671310

Web para probarlo: https://nghttp2.org/?103-eh
Con curl podemos ver que nos envían ese status antes de enviarnos la respuesta.
