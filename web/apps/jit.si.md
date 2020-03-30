https://jitsi.org/
Software que puedes instalar para hacer videollamadas

https://meet.jit.si/
Servicio online para hacer videoconferencias.
Permite compartir pantalla.
Sin límite de usuarios.

https://community.jitsi.org/t/jvb-2-considered-stable/24314
https://jitsi.org/news/jvb-2-0-preparing-our-video-router-for-the-next-10-years-of-video-conferencing/


Jitsi have some good videos about autoscaling/load balancing Jitsi Meet here: https://jitsi.org/news/tag/tutorial/

Navegadores soportados
https://github.com/jitsi/lib-jitsi-meet/blob/master/modules/browser/capabilities.json


We have a lot of experience working with Jitsi Meet, if anyone has questions integrating Jitsi, free to send me an email john@taskade.com. Happy to help!
It took us a while to get video conferencing working on iOS and Android but it is doable and can be cross-platform.
This may be helpful:
https://community.jitsi.org/t/integrate-jitsi-meet-in-existing-react-native-app/19864/2
https://www.npmjs.com/package/react-native-jitsi-meet

You can check out our demos here:
https://apps.apple.com/us/app/taskade-manage-anything/id1264713923
https://play.google.com/store/apps/details?id=com.taskade.mobile


Jibri para grabar?
How did you set up conference recording? I know Jibri exists but the installation instructions are quite confusing. It seems you need a VM per conference you want to record. Is that the case?


As far as I can tell, the annoying thing of self hosting is going to be user management. Realistically you shouldn't allow guests to create meetings, and that means you need an ldap server if you want more than a couple of users.



# Install
https://jitsi.org/news/tag/tutorial/

## Docker / k8s
Ejemplo básico para k8s
https://github.com/jitsi/docker-jitsi-meet/tree/dev/examples/kubernetes


https://github.com/jitsi/docker-jitsi-meet/tree/k8s-helm/k8s

Tenemos que exponer públicamente el puerto UDP 30300
Y configurar la ip donde se expone en DOCKER_HOST_ADDRESS
