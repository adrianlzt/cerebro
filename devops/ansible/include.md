Se puede usar includes al igual que en puppet:

Ejemplo de main.yaml

---
- include: kibana.yml
- include: nginx.yml
  tags:
   - nginx
- include: tasks/sometasks.yml
  when: "'reticulating splines' in output"
