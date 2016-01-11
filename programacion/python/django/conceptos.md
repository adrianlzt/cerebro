A project refers to the entire application and all its parts.

An app refers to a submodule of the application. It's, hopefully, self-contained and not intertwined with other apps in the project so that, in theory, you could pick it up and plop it down into another project without much, or any, modification. An app typically has it's own models.py (which might actually be empty). You might look at it as a python module.


Tendremos un proyecto (por ejemplo, "basesite") y dentro de el las apps.

En en el proyecto "basesite" tendremos a su vez, creada automatiacmente, una app "basesite".
Dentro de esa app se configuran que otras apps pertenecen al proyecto:
basesite/basesite/settings.py:
INSTALLED_APPS = (
    ...
    'rest_framework',
    'eshop'
)

En esta app principal tambien estará el urls.py primero, desde donde se redirigirá el tráfico al resto de apps según la uri
