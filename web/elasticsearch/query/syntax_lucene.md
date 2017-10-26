http://lucene.apache.org/core/3_5_0/queryparsersyntax.html

Ejemplo:
title:"The Right Way" AND text:go

(beat.hostname: ES1 AND metricset.name: process) AND (system.process.username: root OR system.process.username: admin)

mod_date:[20020101 TO 20030101]


fuzzy search (semejanza):
roam~


# Metiendo esta sintaxis en el DSL de ES
{"query": {"query_string":{"query":"\"por ejemplo\""}}}

{"query": {"query_string":{"query":"message: \"por ejemplo\""}}}


Al poner el texto entre comillas ("por ejemplo") estamos buscando exactamente esa cadena.

Si ponemos: "message: " es que solo lo busque en ese field
