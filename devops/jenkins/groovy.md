# Groovy
Se puede inyectar código groovy y ejecutarlo
Esto nos da más potencia, por ejemplo hay un "jenkins" para acceder a toda la info
https://wiki.jenkins-ci.org/display/JENKINS/Jenkins+Script+Console
https://wiki.jenkins.io/display/JENKINS/Jenkins+Script+Console
  hay ejemplos al final
https://github.com/glenjamin/jenkins-groovy-examples/blob/master/README.md
  unos cuantos ejemplos muy aclaratorios

También tiene una consola para jugar: JENKINS_URL/scripts


# Idea para autoconfigurar
En general lo que tendremos que hacer es ir a buscar el código del plugin.
Encontrar su constructor y crear un objeto del tipo que necesitamos.

Ejemplo:
https://github.com/jenkinsci/gitlab-plugin/blob/master/src/main/java/com/dabsquared/gitlabjenkins/connection/GitLabConnection.java#L50
import com.dabsquared.gitlabjenkins.connection.GitLabConnection
GitLabConnection connection = new GitLabConnection("nombre", "http://url.com", "token", true, 60, 60)<Paste>

Probaremos en la consola de scripts que esto genera un objeto válido.

Ahora tenemos que almacenar esta configuración en Jenkins.

Para eso podemos ir a mirar los tests del módulo.
Ejemplo:
https://github.com/jenkinsci/gitlab-plugin/blob/master/src/test/java/com/dabsquared/gitlabjenkins/connection/GitLabConnectionConfigTest.java#L164

De manera general cojeremos el primer objeto de getExtensionList(miclase.class)
Lo modificaremos y lo guardaremos:
def gitlab = jenkins.getExtensionList(com.dabsquared.gitlabjenkins.connection.GitLabConnectionConfig.class)[0]
gitlab...
gitlab.save()

Otro ejemplo:
https://github.com/glenjamin/jenkins-groovy-examples/blob/master/README.md#configure-the-slack-plugin-as-if-the-form-was-submitted





# Crear credentials
http://javadoc.jenkins.io/credentials/com/cloudbees/plugins/credentials/impl/UsernamePasswordCredentialsImpl.html
https://support.cloudbees.com/hc/en-us/articles/217708168-create-credentials-from-groovy

import com.cloudbees.plugins.credentials.impl.*;
import com.cloudbees.plugins.credentials.*;
import com.cloudbees.plugins.credentials.domains.*;

Credentials c = (Credentials) new UsernamePasswordCredentialsImpl(CredentialsScope.GLOBAL, "mi_id", "description", "user", "password")

SystemCredentialsProvider.getInstance().getStore().addCredentials(Domain.global(), c)



Crear token (secret text):
import hudson.util.Secret;
import org.jenkinsci.plugins.plaincredentials.impl.*;
Credentials gitlab = (Credentials) new StringCredentialsImpl(CredentialsScope.GLOBAL, "tokenPrueba", "GitLab Secret Token", Secret.fromString("password"))
