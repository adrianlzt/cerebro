Otro servicio para subir imagenes:

IMAGE="Topo-DIbona.jpg"
JID=$(curl -s -XPOST -F "images=@${IMAGE}" http://funkyimg.com/upload/ | jq -r '.jid')
while [[ $(curl -s http://funkyimg.com/upload/check/${JID} | jq '.success') == "false" ]]; do
echo -n "."; sleep 0.2
done; echo; curl -s http://funkyimg.com/upload/check/${JID} | jq '.bit' | sed "s#.*\[IMG\]\([^\]*\)\[/IMG\].*#\1#"
