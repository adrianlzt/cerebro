Competiciones de ML para aprender ML.
Algunas con premios en metálico.
Se pueden ver la solcuones de la gente?

# Empezar
Usar las competiciones "Getting started".

En particular, mirar estas dos guías:
https://www.kaggle.com/jlawman/complete-beginner-your-first-titanic-submission
https://www.kaggle.com/alexisbcook/titanic-tutorial



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
