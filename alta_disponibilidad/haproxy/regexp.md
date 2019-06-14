acl filebrowser url_beg ^path$


acl filebrowser url_beg aaa
  esto hace match sobre "xxxxxaaaxxxxx", no hace falta poner el .* al comienzo y final

Si tenemos comillas en la regexp hay que escaparlas:
acl redirect_noprod req.body -m reg ,\"name\":\"(pepe|juan|.*maria.*)\",



