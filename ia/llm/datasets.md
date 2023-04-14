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


# Instruction tunning
Databricks Releases 15K Record Training Corpus for Instruction Tuning LLMs
https://github.com/databrickslabs/dolly/tree/master/data
https://news.ycombinator.com/item?id=35541861

Ejemplos:
{
  "instruction": "Who gave the UN the land in NY to build their HQ",
  "context": "",
  "response": "John D Rockerfeller",
  "category": "open_qa"
}
{
  "instruction": "Why mobile is bad for human",
  "context": "",
  "response": "We are always engaged one phone which is not good.",
  "category": "brainstorming"
}
