Se puede usar includes al igual que en puppet:

Ejemplo de main.yaml

---
- include: kibana.yml
- include: nginx.yml
