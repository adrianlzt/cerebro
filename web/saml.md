https://developer.okta.com/docs/concepts/saml/
https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html

Tecnología para autenticar (que no para autorizar).
OAuth es para autorizar.

Protocolo para que un principal (usuario/sujeto) se pueda validar ante un proveedor de identidad (IdP) para luego acceder a diferentes proveedores de servicios.

El típico flujo es un principal solicitando un servicio a un proveedor de servicios.
El proveedor de servicios solicita autenticación al IdP.
El IdP envía una "aserción SAML" al proveedor.

El uso normal es con los navegadores.

Se inicia cuando el navegador solicita un servicio.
El servicio le solicita auth.
El navegador la va a buscar al IdP.
Con esa auth validada vuelve al provider.

El provider tendrá un cert público del IdP para poder validar la respuesta.


# Ejemplo flujo
https://www.ssocircle.com/en/developer-tutorial-saml-testing-using-curl-and-ssocheck-api/developer-tutorial-part-i-a-saml-sso-flow-from-the-command-line-with-curl/

https://software-factotum.medium.com/saml-101-lets-write-a-service-provider-c12d64564e1a

Repo con un SP y un IdP en golang.
https://github.com/monmohan/samltools

Hacemos un curl al SP.
El SP nos reenvia al IdP, junto con información codificada en la URL.
Lo que se envía es un XML, inflated y codificado en base64.
Ejemplo decodificando una URL con CyberChef:
  url_decode + request param + base64 decode + raw inflate
https://gchq.github.io/CyberChef/#recipe=URL_Decode()Split('%3D','%5C%5Cn')Tail('Line%20feed',2)From_Base64('A-Za-z0-9%2B/%3D',true,false)Raw_Inflate(0,0,'Adaptive',false,false)&input=aHR0cHM6Ly9kZXYtZWp0bDk4OHcuYXV0aDAuY29tL3NhbWxwL2xxcmJXV01ZYzI1VXJDaVlBNVB0MDZVNjI1YzRLNkRPP1NBTUxSZXF1ZXN0PWZKREJTc1F3RUlidlBrV1lxN1FtYVdQcnNDMnNlTENnc0t6RnE5UnUyQTIwazVwSndjZVhkajNzWGpiSHpQQjk4JTJGOUNiTGdiaHdtM2N6elIzdjdNbHFQNEhRZGlYQWNWeklIUWQlMkJ3WXFSc3RZJTJCenhZJTJGdiUyQmhqcVZPQVVmZmU4SEVNMUxCViUyRm15YWdzVnliUGpTbXpRaGVsQnRFd3o3WWhqaDNGQ3JUVWVTSlZvb3BXUGFJcE1TdnVwVUlwUWV6JTJCWWMlMkJPRG82T3Q4M2Y1eVhHMTdiZEpYdDdjTUgyRWNTbkRldzhWYUJUQ2ZXZFdOJTJCYUVkZER3a1c0MjRhTzJZYm9QRUc5VkRDeW8lMkJNcFhValIlMkI0R1JwODNEQlhkeG5UJTJCdXk2eiUyRkFnQUElMkYlMkY4JTNE

El XML tiene esta pinta:
<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ID="_5951341544558372782" IssueInstant="2024-01-17T16:58:37+01:00" ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Version="2.0">
      <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">urn:msingh.samltools:sp</saml:Issuer>
</samlp:AuthnRequest>

XML Element/Attribute			Explanation
samlp:AuthnRequest				Standard element to represent a SAML AuthnRequest
ID								Unique value representing the ID of the request. When IDP responds, the assertion will have an attribute inResponseTo with the same value as this ID
Protocol-Binding				Represents how the HTTP request for AuthnRequest is sent. The sample uses "Redirect" binding which means the payload is sent as query parameter
saml:Issuer						Represents the sender, i.e. this Application. Many IDPs would require this to match an entity created with them. For our usage, we set it to same as our SP home , http://sp.samltools.com
IssueInstant					Time when the request was sent. This is required attribute but most IDP don't care for this value

Una vez nos hayamos logeado en el IdP, el navegador será reenviado a un path especial del SP, donde el navegador hará un POST con la SAML assertion.
Que será de nuevo un XML, firmado, con la información del usuario.
La URL a donde nos reenvia tiene que haber sido configurada previamente en el IdP. Se llama la ACS (Assertion Consumer Service) URL.


# Tools
https://www.samltool.com/decode.php
Codificar/decodificar SAML XMLs

https://samltest.id/
Servidor que tiene IdP y SP.
