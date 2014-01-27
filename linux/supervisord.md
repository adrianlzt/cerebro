http://supervisord.org/

Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems.

It shares some of the same goals of programs like launchd, daemontools, and runit. Unlike some of these programs, it is not meant to be run as a substitute for init as “process id 1”. Instead it is meant to be used to control processes related to a project or a customer, and is meant to start like any other program at boot time.


Podemos usarlo para mantener un proceso corriendo en un container Docker.
Ejemplo: http://docs.docker.io/en/latest/examples/running_riak_service/
Ejemplo: https://github.com/justone/docker-mongodb

Dockerfile:
...
add     supervisord.conf /etc/supervisor/conf.d/supervisord.conf
cmd     ["/usr/bin/supervisord", "-n"]

supervisord.conf:
[supervisord]
nodaemon=true

[program:sshd]
command=/usr/sbin/sshd -D
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stderr_logfile=/var/log/supervisor/%(program_name)s.log
autorestart=true

[program:mongod]
command=/usr/bin/mongod --smallfiles
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stderr_logfile=/var/log/supervisor/%(program_name)s.log
autorestart=true
