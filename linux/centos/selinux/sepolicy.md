`sepolicy` a parte de ayudarnos a crear policies, nos puede ayudar a entender la configuración actual con queries.

booleans            query SELinux Policy to see description of booleans
communicate         query SELinux policy to see if domains can communicate with each other
network             Query SELinux policy network information
transition          query SELinux Policy to see how a source process domain can transition to the target process domain

interface           List SELinux Policy interfaces

Mostrar todas las interface:

```bash
sepolicy interface -l
```
