Gestor de paquetes latex

tlmgr

Usar el de /opt/texbin/tlmgr

Para poder usarlo completamente deberemos antes:
sudo apt-get install xzdec
tlmgr init-usertree

Buscar:
tlmgr search concepts

Instalar:
tlmgr install concetps

Listar:
tlmgr info --only-installed



Para incluir paquetes poner:
\usepackage{mathtools}



\usepackage[spanish, es-tabla]{babel}
\usepackage[utf8]{inputenc} %para poder poner tildes de forma normal
\usepackage{textcomp}    %para texteuro, textcelsius, textdegree...
\usepackage[official]{eurosym}    %Para el símbolo oficial €
\usepackage{xfrac}                % Para las fracciones con barra inclinada
\usepackage{subfig}        %Inclusión de subgráficas en gráficas
\usepackage[spanish]{translator} %
\usepackage{siunitx}    %Unidades del sistema internacional
\usepackage{booktabs}    %Para mejorar estilos de tabla
\usepackage{multirow}    %Para usar múltiples líneas en tablas
\usepackage{fixltx2e}    %Para \textsubscript...
\usepackage[authoryear,colon]{natbib}        %Para \citet y \citep
\usepackage{pdflscape}    %Para páginas en "landscape".
\usepackage{afterpage}    %Para evitar espacios en blanco antes de entorno "landscape"
\usepackage{microtype}    %Mejora el aspecto de las fuentes (no noto diferencia)
