# OSCAR
https://oscar-project.org/
Huge multilingual corpus obtained by language classification and filtering of Common Crawl dumps of the Web.

Acceso
https://huggingface.co/datasets/oscar-corpus/OSCAR-2301/

Son ficheros multiline-json con un texto (content) donde también hay información WARC (la URL, fecha, length) y metadata, lenguage, calidad, etc.


# Leipzig Corpora
https://wortschatz.uni-leipzig.de/en/download
Text from diverse sources like news, literature, and wikipedia


# WikiANN / PAN-X
https://huggingface.co/datasets/wikiann
Multilingual named entity recognition dataset consisting of Wikipedia articles annotated with LOC (location), PER (person), and ORG (organisation) tags

Ejemplo en español:
[ "Se", "encuentran", "en", "Indonesia", ",", "Malasia", "y", "Tailandia", "." ]
->
[ 0, 0, 0, 5, 0, 5, 0, 5, 0 ]
[ "LOC: Indonesia", "LOC: Malasia", "LOC: Tailandia" ]


# Anthropic HH-RLHF
https://huggingface.co/datasets/Anthropic/hh-rlhf

Parejas de prompts, el original y el corregido.
Para hacer fine tunning a instructGPTs
