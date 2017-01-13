http://ternjs.net/

Tern is a stand-alone code-analysis engine for JavaScript. It is intended to be used with a code editor plugin to enhance the editor's support for intelligent JavaScript editing. Features provided are:

Autocompletion on variables and properties
Function argument hints
Querying the type of an expression
Finding the definition of something
Automatic refactoring


# VIM
Lo usa youcomplete me para autocompletar, etc con vim


# Uso manual (debug)
npm install tern
node_modules/tern/bin/tern

curl localhost:38343/ -d '{"query":{ "type":"completions", "file": "no.js", "end":0}}'
