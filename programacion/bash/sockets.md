http://www.cyberciti.biz/tips/spice-up-your-unix-linux-shell-scripts.html
#10

You can use bash loop and find out open ports with the snippets:

 
echo "Scanning TCP ports..."
for p in {1..1023}
do
  (>/dev/tcp/localhost/$p) >/dev/null 2>&1 && echo "$p open"
done
