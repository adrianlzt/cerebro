# Authentication
https://docs.openshift.com/container-platform/3.5/install_config/configuring_authentication.html#install-config-configuring-authentication

Como se deben logear los usuarios.
/etc/origin/master/master-config.yaml
seccion identityProviders

Tipos de providers:
AllowAllPasswordIdentityProvider permitir acceso a todo el mundo
DenyAllPasswordIdentityProvider no permitir a nadie
HTPasswdPasswordIdentityProvider usar un fichero htpasswd
KeystonePasswordIdentityProvider
LDAPPasswordIdentityProvider
BasicAuthPasswordIdentityProvider envia un json a un servidor esperando en la respuesta si deja pasar al user o no
RequestHeaderIdentityProvider mira si hay una cabecera que diga si le deja pasar (deberá haber un proxy de auth por delante. Hay un ejemplo para apache)
GitHubIdentityProvider
GitLabIdentityProvider
GoogleIdentityProvider
OpenIDIdentityProvider

Ejemplo para htpasswd:
  identityProviders:
  - challenge: true
    login: true
    mappingMethod: claim
    name: httpasswd_local
    provider:
      apiVersion: v1
      kind: HTPasswdPasswordIdentityProvider
      file: /etc/origin/htpasswd

systemctl restart atomic-openshift-master-api.service




# Authorization
Authorization is handled in the OpenShift Container Platform policy engine, which defines actions like "create pod" or "list services" and groups them into roles in a policy document. Roles are bound to users or groups by the user or group identifier. When a user or service account attempts an action, the policy engine checks for one or more of the roles assigned to the user (e.g., cluster administrator or administrator of the current project) before allowing it to continue.


# Authorization policies
https://docs.openshift.com/enterprise/3.0/architecture/additional_concepts/authorization.html#architecture-additional-concepts-authorization-overview

Ver como estoy logueando con la herramienta "oc":
oc whoami

Que puede hacer un usuario en un proyecto.
Rules: lo que se permite hacer
Roles: colecciones de rules
Bindings: uniones de usuarios y/o grupos a roles

oc get rolebindings
oc get clusterroles
oc get roles
oc get clusterpolicy
oc get clusterrolebindings
oc get policy


# SCC / Security Context Constraints
https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html
https://docs.openshift.com/enterprise/3.0/architecture/additional_concepts/authorization.html#security-context-constraints

Por defecto no está permitido correr containers como root.
Esto es una medida de seguridad por si la app consiguese escapar de los NameSpaces donde está retenida, no sea root en el docker host.


Listar SCCs
oc get scc

Mostrar info detallada sobre un scc
oc describe scc anyuid


Agregar al usuario que corre los containers por defecto en nuestro projecto (el que tengamos configurado actualmente) 
oc adm policy add-scc-to-user anyuid -z default
  CUIDADO! estamos permitiendo a un container correr como root.



# Admission Controllers
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/admission_controllers.html

Mediante plugins podemos controlar de manera fina que queremos que se pueda hacer.
Ejemplos:
  Limiting Number of Self-Provisioned Projects Per User
  Configuring Global Build Defaults and Overrides
  Controlling Pod Placement
  Restricting Role Bindings



# Consideraciones generales de containers y root
OpenShift Container Platform runs containers on your hosts, and in some cases, such as build operations and the registry service, it does so using privileged containers. Furthermore, those containers access your host’s Docker daemon and perform docker build and docker push operations. As such, you should be aware of the inherent security risks associated with performing docker run operations on arbitrary images as they effectively have root access.

For more information, see these articles:
http://opensource.com/business/14/7/docker-security-selinux
https://docs.docker.com/engine/security/security/

To address these risks, OpenShift Container Platform uses security context constraints that control the actions that pods can perform and what it has the ability to access.



# OAuth
Listar tokens
oc get oauthclients
