#! /bin/sh
#
# certificateReader.sh
# Copyright (C) 2017 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.
#
TRUE=0
FALSE=1

is_binary() {
  mime=$(file -b --mime-type "$1")
  if [[ $mime == "application/octet-stream" ]]; then
    return $TRUE
  fi
  return $FALSE
}

is_key() {
  egrep "PRIVATE KEY-----$" "$FILE" >& /dev/null
  if [[ $? -eq 0 ]]; then
    return $TRUE
  fi
  return $FALSE
}

several_certificates_inside() {
  COUNT=$(egrep "^-----" "$FILE" | wc -l)
  if [[ $COUNT -gt 2 ]]; then
    return $TRUE
  fi
  return $FALSE
}

is_file() {
    local file=$1
    [[ -f $file ]]
}

headers () {
    echo "$1" | egrep -A 10 "^Certificate:"
}

##########
## MAIN ##
##########

FILE=$1

if ! is_file "$FILE"; then
  echo -e "File not found.\nUsage: certificateReader.sh FILE"
  exit 1
fi

if is_key "$FILE"; then
  echo -e "$FILE is a private key"
  exit 1
fi


if is_binary "$FILE"; then
  OUTPUT=$(openssl x509 -noout -text -inform der -in "$FILE" 2>&1)
  if [[ $? -eq 0 ]]; then
    # Certificate with DER encoding
    headers "$(echo "$OUTPUT")"
  else
    OUTPUT=$(openssl pkcs7 -inform der -print_certs -text -noout -in "$FILE" 2>&1)
    if [[ $? -eq 0 ]]; then
      # Cert pcks7, DER encoding
      headers "$(echo "$OUTPUT")"
    else
      # Cert pkcs12
      headers "$(openssl pkcs12 -info -in "$FILE")"
    fi
  fi
else
  if several_certificates_inside "$FILE"; then
    # Multi PEM certs in one file
    headers "$(openssl crl2pkcs7 -nocrl -certfile "$FILE" | openssl pkcs7 -print_certs -text -noout)"
  else
    OUTPUT=$(openssl x509 -noout -text -in "$FILE" 2>&1)
    if [[ $? -eq 0 ]]; then
      # Cert PEM encoding
      headers "$OUTPUT"
    else
      # Cert pkcs7, PEM encoding
      headers "$(openssl pkcs7 -print_certs -text -noout -in "$FILE")"
    fi
  fi
fi

