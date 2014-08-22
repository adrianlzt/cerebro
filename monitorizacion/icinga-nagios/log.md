Substituir una fecha de un log en Unix Time to Epoch a fecha normal
echo "[1373855136] SERVICE ALERT: Tomcat2-live;Checkeo de Logs" | awk -F, '{x=$1;sub(/\[/,"",$1);sub(/.*]/,strftime("%Y-%m-%d %H:%M:%S",$1),x);$1=x;}1'
