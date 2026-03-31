https://www.youtube.com/watch?v=7xTGNNLPyMI
Deep Dive into LLMs like ChatGPT

Pre-training: Text + GPU -> basemodel.
Generador de siguiente token

Post-training: basemodel + instruction tuning -> fine-tuned model (SFT)
Convertir en un agente modo chat
Aprende a usar herramientas

Post-training: SFT + RL + RLHF -> aligned model
Alinear las respuestas con lo que queremos y que aprenda a pensar (thinking models).
Toolformer: RL para aprender a usar herramientas

RL: entrenar en su propio mundo

RLHF: Training to align with human preferences. Entrenar a contestar como un humano (otro modelo le dice si lo está haciendo como un humano).

# Algoritmos de recompensa

## PPO (Proximal Policy Optimization)

Un método de gradiente de política para optimizar el comportamiento de los modelos mediante recompensas.

Uso de un juez LLM en paralelo.

## GRPO (Group Relative Policy Optimization)

Generar varias respuestas y elegir la mejor.

Puntuación entre las respuestas. Un modelo que intenta puntuar como lo haría un humano (ha aprendido de unos cuantos ejemplos humanos).
