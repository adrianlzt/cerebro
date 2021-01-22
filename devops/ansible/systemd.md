- name: systemd unit to start xxx
  template:
    src: podman-systemd.unit
    dest: "/etc/systemd/system/{{name}}.service"
  vars:
    podman_name: "{{name}}"

- name: start and enable zbxalerter service
  systemd:
    state: started
    name: "{{name}}"
    daemon_reload: yes



[Unit]
Description=Podman {{podman_name}}
Documentation=man:podman-generate-systemd(1)

[Service]
Restart=on-failure
ExecStart=/usr/bin/podman start {{podman_name}}
ExecStop=/usr/bin/podman stop -t 10 {{podman_name}}
KillMode=none
Type=forking
PIDFile={{podman_pid_dir}}/{{podman_name}}

[Install]
WantedBy=multi-user.target



Fact que nos dice si tenemos systemd:
"ansible_service_mgr": "systemd"
