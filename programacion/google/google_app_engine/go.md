https://cloud.google.com/appengine/docs/go/quickstart
https://cloud.google.com/appengine/docs/go/how-to
https://cloud.google.com/appengine/docs/go/gettingstarted/creating-guestbook#objectives

yaourt -S aur/google-appengine-go

# HelloWorld
cd /opt/google-appengine-go/demos/helloworld/
/usr/bin/dev_appserver-go .

http://localhost:8080/


# Desplegar en GAE
Crear proyecto: https://console.cloud.google.com

Cambiar el nombre de la aplicacion con el que hayamos creado:
También añadir la línea "module: default"
  vi app.yml

Desplegar en google:
  appcfg-go update app.yml

App desplegada en:
  https://project-id.appspot.com/


# DataStore
https://cloud.google.com/appengine/docs/go/datastore/creating-entities#Go_Creating_entities

## Guardar objeto
func init() {
	http.HandleFunc("/lavadora", lavadora_puesta)
}

type Lavadora struct {
	User string
	Fin time.Time
}

func lavadora_puesta(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	lavadora := &Lavadora{
		User: "adri",
		Fin: time.Now(),
	}
	key := datastore.NewIncompleteKey(ctx, "Lavadora", nil)
	if _, err := datastore.Put(ctx, key, lavadora); err != nil {
		log.Printf("Error guardando lavadora: %v", err.Error())
	}
}

## Consultar objetos
https://cloud.google.com/appengine/docs/go/datastore/retrieving-query-results#iterating_queries

func chequea_lavadora(w http.ResponseWriter, r *http.Request) {
	log.Println("chequea_lavadora")
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery("Lavadora")
	var lavados []Lavadora
	keys, err := q.GetAll(ctx, &lavados)
	if err != nil {
		log.Printf("fetching lavados: %v", err)
		return
	}
	for i, p := range lavados {
		k := keys[i]
		// Do something with Person p and Key k
		log.Printf("lavado: %v (%v)", p.Fin, k)
	}
}

# Cron
https://cloud.google.com/appengine/docs/go/config/cron
https://cloud.google.com/appengine/docs/go/config/cronref
https://cloud.google.com/appengine/docs/go/config/cronref#schedule_format

cron.yml
cron:
- description: daily summary job
  url: /tasks/summary
  target: beta
  schedule: every 24 hours

Enviar a GAE con:
appcfg.py update_cron .
