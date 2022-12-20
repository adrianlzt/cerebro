https://stackoverflow.com/questions/64509618/podman-in-podman-similar-to-docker-in-docker#:~:text=library/alpine%20ls%20/-,Podman%20in%20Podman,-Let%27s%20run%20ls

podman \
  run \
    --rm \
    --security-opt label=disable \
    --user podman \
    quay.io/podman/stable \
      podman \
        run \
          --rm \
          docker.io/library/alpine \
            ls / 
