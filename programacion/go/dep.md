https://github.com/golang/dep
Go dependency tool
It IS, however, the consensus effort of most of the Go community, and being integrated into the go toolchain is the goal.

Obtener herramienta:
go get -u github.com/golang/dep/...


Crear los ficheros:
dep init

Meter una dep:
dep ensure github.com/some/repo@v0.2.1

Si queremos master:
dep ensure github.com/some/repo@master

Nos mete las dependencias en el directorio vendor/ del proyecto


Dep status nos muestra info de las libs que tenemos marcadas, que limitaciones le hemos puesto



The tool will use a “two-file system” - a manifest that describes constraints, and a lock that describes a precisely reproducible build

manifest.json
{
    "dependencies": {
        "github.com/Masterminds/semver": {
            "branch": "2.x"
        },
        "github.com/Masterminds/vcs": {
            "version": "^1.8.0"
        },
        "github.com/pkg/errors": {
            "version": ">=0.8.0, <1.0.0"
        },
        "github.com/sdboyer/gps": {
            "version": ">=0.14.0, <1.0.0"
        }
    }
}


lock.json
{
    "memo": "fc012dfb266db9deec4121dd38069e2556ba66a5514939662da94fac1251996e",
    "projects": [
        {
            "name": "github.com/Masterminds/semver",
            "branch": "2.x",
            "revision": "94ad6eaf8457cf85a68c9b53fa42e9b1b8683783",
            "packages": [
                "."
            ]
        }
}


# Errores
No funciona si el repo es un link
https://github.com/golang/dep/issues/218
https://github.com/golang/dep/pull/247
