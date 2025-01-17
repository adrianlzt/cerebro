# Ideas de como mejorar el proceso de desarrollo usando herramientas IA

Primero tener una charla sin generación de código donde vamos partiendo de ideas más básicas a una arquitectura más definida.
Luego podemos definir las estructuras básicas.
Hacer TDD, generar los tests y luego el código, con esto nos aseguramos que futuras iteraciones no rompen lo que tenemos.

I have a lot of documentation aimed at the AI in docs/notes/ (some of it written by an LLM but proofread before committing) and I instruct Cursor/Windsurf/Aider via their respective rules/config files to look at the documentation before doing anything

It starts by planning out the program structure with types and function signatures. Then the function implementation (aka holes) can be filled in after the function signatures and types are set.
