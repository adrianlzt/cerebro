Competiciones de ML para aprender ML.
Algunas con premios en metálico.

# Empezar
Usar las competiciones "Getting started".

En particular, mirar estas dos guías:
https://www.kaggle.com/jlawman/complete-beginner-your-first-titanic-submission
https://www.kaggle.com/alexisbcook/titanic-tutorial


# Soluciones / kernels
Para problema la gente publica soluciones
Ejemplo de url para la competición "titanic"
https://www.kaggle.com/c/titanic/kernels?competitionId=3136&sortBy=voteCount



# kaggle API
https://github.com/Kaggle/kaggle-api
app para bajar inputs, etc
aur/kaggle-api

Bajar datos de una competición:
kaggle competitions download titanic

Enviar un submission:
kaggle competitions submit titanic -f predictions.csv -m "first use of kaggle"

Listar mis submissions:
kaggle competitions submissions titanic

Mirar lista de participantes y sus puntuaciones:
kaggle competitions leaderboard --show titanic
