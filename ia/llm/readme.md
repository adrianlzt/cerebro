Large language models

La técnica actual para crear estos modelos es usar transformers.
Esta arquitectura se define en el paper de Google "Attention Is All You Need" https://arxiv.org/abs/1706.03762


# Paradigmas

## MRKL (Modular Reasoning, Knowledge, and Language)
https://arxiv.org/pdf/2205.00445.pdf

Es pedir al LLM que genere un razonamiento y usarlo con herramientas externas para darle la información correcta para que siga hacia la respuesta final.


## ReAct
https://arxiv.org/pdf/2210.03629.pdf
https://learnprompting.org/docs/advanced_applications/react

Generate both, reasoning traces and task-specific actions in an interleaved manner, allowing for greater synergy between the two

Parece que agrega a MRKL el que de detalles del razonamiento.


## SelfAsk
https://arxiv.org/pdf/2210.03350.pdf

Indicarle al LLM, con unos few-shots, que debe auto realizarse preguntas para ir desgranando la pregunta original hasta obtener la respuesta.

Ejemplo de un few-shot:
"""
Question: Who lived longer, Muhammad Ali or Alan Turing?
Are follow up questions needed here: Yes.
Follow up: How old was Muhammad Ali when he died?
Intermediate answer: Muhammad Ali was 74 years old when he died.
Follow up: How old was Alan Turing when he died?
Intermediate answer: Alan Turing was 41 years old when he died.
So the final answer is: Muhammad Ali
"""
