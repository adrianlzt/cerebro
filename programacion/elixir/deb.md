https://github.com/jnylen/pkg_deb
https://hexdocs.pm/pkg_deb/api-reference.html
Generar paquetes .deb

Posibilidades de configuración: https://github.com/jnylen/pkg_deb/blob/master/lib/pkg_deb/format/config.ex#L8


Cambios necesarios:
--- a/mix.exs
+++ b/mix.exs
@@ -4,13 +4,19 @@ defmodule BooksApi.MixProject do
   def project do
     [
       app: :books_api,
       version: "0.2.0",
       elixir: "~> 1.7",
       elixirc_paths: elixirc_paths(Mix.env()),
       compilers: [:phoenix, :gettext] ++ Mix.compilers(),
       start_permanent: Mix.env() == :prod,
       aliases: aliases(),
-      deps: deps()
+      deps: deps(),
+      deb_config: deb_config(),
+      releases: [
+        books_api: [
+          steps: [:assemble, &PkgDeb.create(&1, deb_config())],
+        ]
+      ]
     ]
   end

@@ -42,7 +48,8 @@ defmodule BooksApi.MixProject do
       {:telemetry_poller, "~> 0.4"},
       {:gettext, "~> 0.11"},
       {:jason, "~> 1.0"},
-      {:plug_cowboy, "~> 2.0"}
+      {:plug_cowboy, "~> 2.0"},
+      {:pkg_deb, "~> 0.4.0"}
     ]
   end

@@ -60,4 +67,16 @@ defmodule BooksApi.MixProject do
       test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"]
     ]
   end
+
+  defp deb_config() do
+    [
+      vendor: "Your Name",
+      maintainers: ["Your Name <your@email.com>"],
+      homepage: "https://yourdomain.com",
+      base_path: "/opt",
+      external_dependencies: [],
+      owner: [user: "root", group: "root"],
+      description: "yourdescription
+"
+    ]
+  end
 end


NOTA: hace falta un cambio de línea vacio en description, si no, dará el error:

dpkg: error processing archive books-api_0.3.0_amd64.deb (--install):
parsing file '/var/lib/dpkg/tmp.ci/control' near line 9 package 'books-api':
end of file during value of field 'Description' (missing final newline)


Una vez modificado el mix.exs

mix deps.get
mix release
Generará el RPM en: _build/releases/NOMBRE_0.1.0_amd64.deb

Generalmente querremos generar el rpm de la release de prod:
MIX_ENV=prod mix release

Info del .deb:
dpkg -I file.deb
Contenido:
dpkg -c file.deb

Nos meterá una unit de systemd

NOTA: los ejecutables solo son 755 (sin g+x).
Cuidado con intentar ejecutar con un usuario no root.
Tendremos que prefijar con "bash"


# Additional files
Si queremos meter más ficheros podemos usar

  defp deb_config() do
    [
      additional_files: [{"/../../../../priv/","/opt/foo/priv"}],

Esto meterá el directorio "priv/" (a la altura de mix.exs) en /opt/foo/priv (si nuestra app es foo, todo estará en /opt/foo)

Debe existir el directorio: 
mkdir -p _build/releases/pkg_deb/additional_files

