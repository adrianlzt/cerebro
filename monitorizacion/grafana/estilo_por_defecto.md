- name: set default theme to light
  lineinfile: dest={{item}} line="  \"style\": \"light\","
  with_items:
    - /usr/share/grafana/public/dashboards/home.json
    - /usr/share/grafana/public/dashboards/template_vars.json
    - /usr/share/grafana/public/dashboards/default.json

