https://serverfault.com/questions/162429/how-do-i-add-access-control-allow-origin-in-nginx/

location / {
  add_header Access-Control-Allow-Origin *;
}

