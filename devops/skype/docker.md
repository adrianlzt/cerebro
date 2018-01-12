https://github.com/ogarcia/docker-skype

# Build
docker build -t sameersbn/skype github.com/ogarcia/docker-skype

# Install
docker run -it --rm --volume /usr/local/bin:/target sameersbn/skype:latest install

# Run
skype-wrapper skype
