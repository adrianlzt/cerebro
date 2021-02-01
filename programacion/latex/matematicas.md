Lib en JS para TeX de matemáticas
https://www.mathjax.org/
Ejemplo: https://gist.github.com/adrianlzt/ba2b668254f46bb9364c0eb1ab04584c
Podemos ejecutarlo en: https://jsbin.com/fodipoy/edit?html,output



Método 'en línea':
$y^{2} = 4p + 7$


Fórmula destacada, la centra en el documento y le asigna un número. Si no queremos numerarla podemos usar \begin{equation*} \end{equation*}
\begin{equation}
  w = \sum_{i=1}^{n} (x_{i}+y_{i})^{2}
\end{equation}


Tabla con algunos ejemplos de como escribir en latex: http://navarroj.com/latex/assets/output-4.png


\pi
\Pi
\alpha
\omega

\sin
\cos
\log
\lim

Todos los caracteres: http://www.tex.ac.uk/tex-archive/info/symbols/comprehensive/symbols-a4.pdf


Meter un valor absoluto en una fórmula:
\usepackage{mathtools}
\DeclarePairedDelimiter{\abs}{\lvert}{\rvert} 
...
\abs{..fórmula..}.
