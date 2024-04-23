# Capturar ficheros cuando se crean
while true; do
    file=$(inotifywait -q -e create --format "%f" .)
    cp "$file" "${file}.copy"
    echo "copiado $file"
done

