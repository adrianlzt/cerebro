https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#minimize-the-number-of-layers

https://gist.github.com/kwk/55bb5b6a4b7457bef38d
# this forces dpkg not to call sync() after package extraction and speeds up # install
RUN echo "force-unsafe-io" > /etc/dpkg/dpkg.cfg.d/02apt-speedup
# # we don't need and apt cache in a container
RUN echo "Acquire::http {No-Cache=True;};" > /etc/apt/apt.conf.d/no-cache

# Para evitar que fallen paquetes que quieren preguntar cosas en la instalación (usando ARG en vez de ENV para evitar que la variable se quede en el contendor, así solo estará en el build)
ARG DEBIAN_FRONTEND=noninteractive

INSTALL_PKGS="fluentd-${FLUENTD_VERSION} \
              bc \
              iproute" && \
yum install -y --setopt=tsflags=nodocs $INSTALL_PKGS && \
rpm -V $INSTALL_PKGS && \
yum clean all && rm -rf /var/cache/yum

El rpm -V nos asegura haber instalado lo que queríamos. yum no falla si algún paquete no existe.


RUN apt-get update && apt-get install -y \
    aufs-tools \
    automake \
    build-essential \
    curl \
    dpkg-sig \
    libcap-dev \
    libsqlite3-dev \
    mercurial \
    reprepro \
    ruby1.9.1 \
    ruby1.9.1-dev \
    s3cmd=1.1.* \
 && rm -rf /var/lib/apt/lists/*

Si queremos borrar una serie de paquetes instalados solo para un build:


RUN cat /var/lib/dpkg/status | grep "^Package:" | cut -d ' ' -f2 | sort > /tmp/pkgs_init \
    && apt-get -qq update \
    && apt-get install -y -qq \
       make \
       build-essential \
    && make
    && cat /var/lib/dpkg/status | grep "^Package:" | cut -d ' ' -f2 | sort > /tmp/pkgs_end \
    && comm --output-delimiter=' ' -3 /tmp/pkgs_init /tmp/pkgs_end > /tmp/pkgs_installed \
    && echo 'Yes, do as I say!' | SUDO_FORCE_REMOVE=yes apt-get remove --purge --auto-remove -y --force-yes -qq $(cat /tmp/pkgs_installed) \
    && apt-get clean -qq \
    && rm -rf /tmp/* /var/lib/apt/lists/* /var/cache/debconf/* /var/log/{alternatives.log,apt,dpkg.log}

cat /var/lib/dpkg/status | grep "^Package:" | cut -d ' ' -f2 | sort > /tmp/pkgs_init
apt-get install ...
cat /var/lib/dpkg/status | grep "^Package:" | cut -d ' ' -f2 | sort > /tmp/pkgs_end
comm --output-delimiter=' ' -3 /tmp/pkgs_init /tmp/pkgs_end > /tmp/pkgs_installed
echo 'Yes, do as I say!' | SUDO_FORCE_REMOVE=yes apt-get remove --purge --auto-remove -y --force-yes $(cat /tmp/pkgs_installed)
apt-get clean
rm -fr /var/lib/apt/lists/* /var/cache/debconf/* /var/log/{alternatives.log,apt,dpkg.log}

Si no vamos a borrar paquetes esenciales (https://askubuntu.com/questions/436171/why-the-apt-prompts-me-to-enter-the-full-phrase-while-purging-a-package) ni sudo podemos hacer simplemente:
apt-get remove --purge --auto-remove -y --force-yes $(cat /tmp/pkgs_installed)


apt-get -qq update&& apt-get install -y -qq ca-certificates build-essential cmake make sudo wget unzip libsystemd-dev git && apt-get install -y -qq --reinstall lsb-base lsb-release


--force-yes esta deprectad, ahora están las opciones:
--allow-downgrades --allow-remove-essential --allow-change-held-packages


# Alpine
ARG SUPERVISOR_VERSION=3.3.4-r1
RUN apk add --no-cache --update keepalived=$SUPERVISOR_VERSION


# Arch / Pacman
RUN pacman -Sy && pacman -S ... && pacman -Sc --noconfirm
