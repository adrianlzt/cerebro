https://developers.google.com/apps-script/reference/cache/

var cache = CacheService.getScriptCache();

var value = cache.get('foo');
//Si hacemos un get de algo que no está en la cache obtendremos null

if (cache.get('foo') == null) {
  Logger.log("es null");
}

cache.put('foo', 'bar');
// Maximo tamaño, 100KB
// Tiempo por defecto, 10'



Poner algo con tiempo de expiración
put(key, value, expirationInSeconds)
// the maximum time the value will remain in the cache, in seconds. The minimum is 1 second and the maximum is 21600 seconds (6 hours).
