Para dockerfile: https://docs.docker.com/reference/builder/#environment-replacement
ENV VARIABLE valor


Para cli:
docker run -e "deep=purple" --rm ubuntu /bin/bash
