Trello con las tareas que quieren hacer:
https://trello.com/atomicopenshift


# API
pkg/cmd/server/origin/handlers.go
Aqui parece que es donde se hace parte del routing de las APIs especificas de openshift

La lista de las APIs la podemos obtener de un fichero de test
test/integration/master_routes_test.go


# CLI
origin/pkg/cmd/cli/cmd
  por aqui andan implementados los comandos de la cli
  muchos son wrappers sobre la cli de kubectl: k8s.io/kubernetes/pkg/kubectl/

Por ejemplo el delete lo que hace es un wrapper al delete de kubernetes
func NewCmdDelete(fullName string, f *clientcmd.Factory, out, errOut io.Writer) *cobra.Command {
  cmd := kcmd.NewCmdDelete(f, out, errOut)
