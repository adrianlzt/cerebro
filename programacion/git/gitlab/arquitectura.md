https://docs.gitlab.com/ee/development/architecture.html#simplified-component-overview

puma: el server web que corre el rails de gitlab
sidekiq: ejecutor de jobs (por ejemplo, los jobs de ci/cd)
workhorse: para descargar tareas de puma, proxy inverso
redis: sesiones, jobs queue, cache



