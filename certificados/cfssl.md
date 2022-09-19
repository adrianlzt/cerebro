https://github.com/cloudflare/cfssl

Generar cert y key autofirmados:
echo '{}' | cfssl selfsign localhost - 2>/dev/null | tee >(jq -r '.cert' > cert.pem) >(jq -r '.key' > key.pem)
