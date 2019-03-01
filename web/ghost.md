https://docs.ghost.org/concepts/introduction/

Ghost is an open source, professional publishing platform built on a modern Node.js technology stack — designed for teams who need power, flexibility and performance.

Es como un wordpress/drupal escrito en nodejs

# Docker
docker run \
  -d \
  --name ghost1.25 \
  -p 2368:2368 \
  -e url=http://news.dot.com \
  -e mail__transport=SMTP \
  -e mail__from=noreply@mail.com \
  -e mail__options__host=10.0.1.1 \
  -e mail__options__port=25 \
  -v "/app/ghost_rss/data:/var/lib/ghost/content" \
  ghost


Si estamos por detrás de un balanceador que nos hace el ssl offloading y configuramos la url con https, el LB debe pasar la cabecera:
X-Forwarded-Proto: https


# Cli administrativa
https://github.com/TryGhost/Ghost-CLI
