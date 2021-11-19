https://towardsdatascience.com/when-and-why-to-use-over-in-python-b91168875453

:= can be used to assign variables while another expression is being evaluated

if created_at := c.params["created_at"]:
  ...

Si c.params["created_at"] existe, asignar el valor a created_at para usarlo dentro del if.
