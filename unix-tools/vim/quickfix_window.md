:cwin
Se debe usar junto con otra cosa

Para cerrar una, saltar a ella y cerrar:
Control+w w
:q


:copen " Open the quickfix window
:ccl   " Close it
:cw    " Open it if there are "errors", close it otherwise (some people prefer this)
:cn    " Go to the next error in the window
:cnf   " Go to the first error in the next file


Cuando escribamos "GOLINT", ejecutar un comando externo y mostrarlo en la quickfix window.
command GOLINT :cexpr system('golangci-lint run') | cwindow

Cuando guardemos un fichero .go, ejecutar "GOLINT" y mostrarlo en la quickfix
autocmd BufWritePost,FileWritePost *.go execute 'GOLINT' | cwindow


Mi alias, cerrar quickfix:
,x
