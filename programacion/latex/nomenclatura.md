%% nomencl

% Esta pensado para explicar que significa cada caracter en una ecuación.
% No enlaza donde ponemos \nomenclature con la página generada por \printnomenclature como se hace con los acrónimos por ejemplo.

% Usar mejor glossaries (mirar glosario.md)

% http://cs.brown.edu/about/system/software/latex/doc/nomencl.pdf
\documentclass{article}
\usepackage[intoc,refpage]{nomencl} %intoc para que aparezca en el indice

\makenomenclature

\begin{document}
Here is some text, where we use APC.\nomenclature{APC}{antigeen-presenterende cel}

\renewcommand{\nomlabel}[1]{{\textbf{#1}}} % poner la palabra en negrita
\printnomenclature
\end{document}
% pdflatex NOMBRE; makeindex -s nomencl.ist -t NOMBRE.nlg -o NOMBRE.nls NOMBRE.nlo; pdflatex NOMBRE

% Parece que no se puede meter nomenclature en ciertas partes (no me lo pillaba en el resumen)
