<https://dspy.ai/>
[Explicación de uno de los developers](https://x.com/lateinteraction/status/1921565300690149759?t=gO4O2Ty_D6yVv90E-usxtw&s=19)
[Video donde lo explican](https://www.youtube.com/watch?v=JEMYuzrKLUw&t=941s)
Este [video](https://www.youtube.com/watch?v=Dt3H2ninoeY) me parece una mejor, y más pausada, explicación.

DSPy is a declarative framework for building modular AI software. It allows you to iterate fast on structured code, rather than brittle strings, and offers algorithms that compile AI programs into effective prompts and weights for your language models, whether you're building simple classifiers, sophisticated RAG pipelines, or Agent loops.

Think of DSPy as a higher-level language for AI programming (lecture), like the shift from assembly to C or pointer arithmetic to SQL.

Parece que la idea es decir lo que quieres hacer con el LM, en vez de tener que crear prompts haciendo copy&paste de templates.
Por ejemplo: quiero hacer CoT con RAG, y DSPy genera el prompt para conseguir eso.

# Conceptos

## Signatures

Decidimos que queremos que haga el LM, expresadas como "firmas" de funciones:

```
question -> answer: float
```

## Modules

Son las distintas técnicas que existen para hacer prompting (CoT, etc), empaquetadas de manera que las podamos usar sencillamente.
A estos módulos le pasaremos una signature.

## Optimizers

Es la forma automática de hacer prompt engineering.
Como mejorar esos prompts para mejorar una métrica que hayamos definido.

Estos optimizadores "compilan" los módulos+signatures para nuestro caso de uso.
Buscan el mejor prompt para nuestra pipeline.
Generan el entregable que usaremos.

## Adapters

Tradcucen módulos en basic prompts.

# Como funciona

Definimos como debe "pensar" y que debe devolver.
DSPy genera un prompt para el modelo de lenguaje.
Cuando queremos ejecutarlo, DSPy pasa nuestro "input" con ese template del prompt al LM.

Ejemplo:

```python
math = dspy.ChainOfThought("question -> answer: float")
math(question="Two dice are tossed. What is the probability that the sum equals two?")
```

Intercambio de mensajes:

```
System message:

Your input fields are:
1. `question` (str)
Your output fields are:
1. `reasoning` (str)
2. `answer` (float)
All interactions will be structured in the following way, with the appropriate values filled in.

[[ ## question ## ]]
{question}

[[ ## reasoning ## ]]
{reasoning}

[[ ## answer ## ]]
{answer}        # note: the value you produce must be a single float value

[[ ## completed ## ]]
In adhering to this structure, your objective is:
        Given the fields `question`, produce the fields `answer`.


User message:

[[ ## question ## ]]
Two dice are tossed. What is the probability that the sum equals two?

Respond with the corresponding output fields, starting with the field `[[ ## reasoning ## ]]`, then `[[ ## answer ## ]]` (must be formatted as a valid Pythonfloat), and then ending with the marker for `[[ ## completed ## ]]`.


Response:

[[ ## reasoning ## ]]
When two fair dice are tossed, there are 6 possible outcomes for the first die and 6 possible outcomes for the second die. The total number of possible outcomes is the product of the outcomes for each die, which is 6 * 6 = 36.
We are looking for the probability that the sum of the two dice equals two. The only way to get a sum of two is if both dice land on 1. This corresponds to the outcome (1, 1).
There is only 1 favorable outcome (1, 1).
The probability is the number of favorable outcomes divided by the total number of possible outcomes.
Probability = (Number of outcomes where the sum is 2) / (Total number of possible outcomes)
Probability = 1 / 36

To express this as a float, we calculate 1 divided by 36.
1 / 36 ≈ 0.02777777...

[[ ## answer ## ]]
0.02777777777777778

[[ ## completed ## ]]
```

# Tracing / debug / observability

<https://dspy.ai/tutorials/observability/>

Para loguear a MLflow Tracing

```
mlflow.dspy.autolog()
```

Para ver las n últimas peticiones:

```python
dspy.inspect_history(n)
```
