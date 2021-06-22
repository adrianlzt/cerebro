:help key-map

Con telescope
LEADERfk
  listado con todos los keymaps y buscando


https://web.archive.org/web/20160718060038/http://www.badassvim.com/how-to-remap-keys-in-vim/
https://stackoverflow.com/a/3776182

C-s
  quiere decir control+s

https://vi.stackexchange.com/questions/4290/can-i-map-a-ctrl-upper-case-letter-separately-from-ctrl-lower-case-letter
C-s
C-S
  es lo mismo, la consola no distingue


Ver mapping actual:
:map normal, visual+select, operator-pending
:nmap for normal mode mappings
:vmap for visual+select mode mappings
:xmap for visual mode mappings
:smap for select mode mappings
:imap for insert mode mappings
:omap operator-pending

:noremap -> non recursive map (si hacemos noremap "W j", y "j" ya estaba mapeado a "gg", W no se mapeará a "gg"

Mapear:
nmap j comando


Ver mapeo de una tecla:
:verbose imap <tab>

