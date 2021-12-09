docker system df
  will show used space, similar to the unix tool df

docker system prune
  will remove all unused data.
    - all stopped containers
    - all volumes not used by at least one container
    - all networks not used by at least one container
    - all dangling images


docker volume prune
  removes unused volumes only.

docker image prune
