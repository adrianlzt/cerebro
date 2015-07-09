RUN yum -y install mongodb-server; yum clean all

RUN apt-get update \
  && apt-get install -y postgresql-common \
  && rm -rf /var/lib/apt/lists/*
