-------------------------------------------------------------------------------------
| Description                           | Docker field name | Kubernetes field name |
-------------------------------------------------------------------------------------
| The command run by the container      | Entrypoint        | command               |
| The arguments passed to the command   | Cmd               | args                  |
-------------------------------------------------------------------------------------



kubectl run -it --rm --restart=Never alpine --image=alpine sh
