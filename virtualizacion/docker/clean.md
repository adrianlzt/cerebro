docker system df
will show used space, similar to the unix tool df

docker system prune
will remove all unused data. - all stopped containers - all volumes not used by at least one container - all networks not used by at least one container - all dangling images

docker volume prune
removes unused volumes only.

docker image prune

Script python que te pregunta por cada imagen si quieres borrarla o no.
Borra por defecto todas las "none".

```bash
uv run https://gist.githubusercontent.com/adrianlzt/2f1f8245301ef89fb77530ff8c4eae40/raw/1f2e5e229d0fb5b860e975cd7b5cb53839c08e32/docker_clean_ask.py
```
