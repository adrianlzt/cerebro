Oracle SCAN (Single Client Access Name) funciona como una capa de abstracción y balanceo de carga en la red que desacopla a los clientes de la infraestructura física del cluster Oracle RAC.

**Componentes Principales de Red**

* **Registro DNS / GNS:** El cliente utiliza un único nombre de dominio FQDN (ej. `rac-scan.midominio.com`). En el servidor DNS (o GNS), este nombre debe estar configurado para resolver mediante Round-Robin en **3 direcciones IP virtuales (SCAN IPs)** dentro de la misma subred pública del cluster.
* **SCAN VIPs:** Son 3 direcciones IP virtuales asignadas dinámicamente a los nodos por Oracle Grid Infrastructure. Si un nodo se cae, Grid Infrastructure conmuta (failover) la SCAN VIP hacia otro nodo activo automáticamente.
* **SCAN Listeners:** Cada SCAN VIP tiene asociado un SCAN Listener escuchando en el puerto configurado (por defecto, TCP 1521).
* **Local Listeners y Node VIPs:** Cada nodo del cluster tiene su propio listener local asociado a la IP virtual exclusiva del nodo (**Node VIP**). Los procesos de la base de datos (LREG/PMON) registran sus servicios tanto en el Local Listener como en todos los SCAN Listeners.

**Flujo de Conexión Paso a Paso**

1. **Resolución DNS:** El cliente consulta el DNS por el nombre SCAN. El DNS entrega una de las 3 SCAN IPs de forma rotativa (Round-Robin).
2. **Petición al SCAN Listener:** El cliente inicia el handshake TCP y envía la petición de conexión (`CONNECT_DATA`) a la SCAN IP en el puerto 1521.
3. **Redirección (Redirect Message):** El SCAN Listener **no atiende ni mantiene la sesión de base de datos**. Revisa las métricas de carga en tiempo real del cluster y responde al cliente con un paquete de redirección que contiene la **Node VIP** y el puerto del Local Listener del nodo óptimo.
4. **Conexión Final:** El cliente cierra la conexión con el SCAN Listener y abre una nueva conexión TCP directamente contra la **Node VIP** del nodo asignado.
5. **Atención de la Sesión:** El Local Listener del nodo recibe la conexión y le entrega la sesión al proceso de servidor (*Dedicated Server Process*) o *Dispatcher* de la instancia.

**Beneficios en la Capa de Red**

* **Transparencia en Cambios:** Permite agregar o retirar nodos del RAC sin necesidad de modificar el archivo `tnsnames.ora` o las cadenas de conexión JDBC de las aplicaciones.
* **Balanceo y Failover de Entrada:** Garantiza que el tráfico inicial de conexión se distribuya de manera uniforme y que siempre haya una IP de acceso disponible aunque fallen nodos.
