https://en.wikipedia.org/wiki/Elo_rating_system

(Generado por GPT4)
El sistema de ranking ELO es un método utilizado para calcular la habilidad relativa de los jugadores en juegos de dos personas, como el ajedrez, go, videojuegos competitivos, etc.
Este sistema fue desarrollado por Arpad Elo, un maestro de ajedrez y profesor de física húngaro-estadounidense en los años 60.
El objetivo es medir el desempeño de los jugadores y predecir cuál tiene más probabilidades de ganar en base a sus puntuaciones actuales.

Veamos un ejemplo de cómo funciona el sistema ELO en una partida de ajedrez ficticia entre dos jugadores:

1. Alicia (ELO 1800) y Beatriz (ELO 1500) se enfrentan en una partida de ajedrez.

2. Primero, calculamos la probabilidad de victoria para ambas jugadoras:

- Probabilidad de victoria de Alicia (Pa):
   Pa = 1 / (1 + 10^[(ELO_Beatriz - ELO_Alicia) / 400])
   Pa = 1 / (1 + 10^[(1500 - 1800) / 400])
   Pa ≈ 0.76

- Probabilidad de victoria de Beatriz (Pb):
   Pb = 1 / (1 + 10^[(ELO_Alicia - ELO_Beatriz) / 400])
   Pb = 1 / (1 + 10^[(1800 - 1500) / 400])
   Pb ≈ 0.24

Aquí podemos observar que Alicia tiene un 76% de probabilidad de ganar, mientras que Beatriz tiene un 24%.

3. Después de que la partida concluye, Alicia (1800) gana a Beatriz (1500). Actualizamos sus puntuaciones ELO:

- Para determinar las nuevas puntuaciones, primero definimos un número llamado "factor K". Este factor varía entre 10 y 40, dependiendo de la experiencia y habilidad del jugador. En nuestro ejemplo, supongamos que ambos jugadores tienen un factor K de 30.

- Actualización de la puntuación ELO de Alicia:
   Nueva puntuación de Alicia = ELO_Alicia + K_factor * (resultado real - Pa)
   Nueva puntuación de Alicia = 1800 + 30 * (1 - 0.76)
   Nueva puntuación de Alicia ≈ 1807.2

- Actualización de la puntuación ELO de Beatriz:
   Nueva puntuación de Beatriz = ELO_Beatriz + K_factor * (resultado real - Pb)
   Nueva puntuación de Beatriz = 1500 + 30 * (0 - 0.24)
   Nueva puntuación de Beatriz ≈ 1492.8

Ahora, después de la partida, Alicia aumenta su puntuación ELO a 1807.2 y Beatriz disminuye la suya a 1492.8.

En resumen, el sistema de ranking ELO asigna a cada jugador una puntuación que se actualiza después de cada partida en función del resultado y la diferencia de fuerza entre los oponentes. Esto permite una evaluación del desempeño relativo y una predicción de quién tiene más probabilidades de ganar en futuras partidas.
