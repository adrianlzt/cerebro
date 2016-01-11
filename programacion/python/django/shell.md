python manage.py shell

from projectname.home.models import Ejercicio

from maasserver.models import Node
Node.objects.all()
node = Node.objects.first()
