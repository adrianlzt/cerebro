Reverse proxy con certificados autofirmados

```Caddyfile
{
  debug
        auto_https off
}

https://:6060 {
        tls internal {
          on_demand
        }
        reverse_proxy :6061
}
```
