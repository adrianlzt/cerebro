# Groovy
Se puede inyectar código groovy y ejecutarlo
Esto nos da más potencia, por ejemplo hay un "jenkins" para acceder a toda la info
https://wiki.jenkins-ci.org/display/JENKINS/Jenkins+Script+Console

También tiene una consola para jugar: JENKINS_URL/scripts



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

