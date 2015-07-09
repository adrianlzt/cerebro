python manage.py shell
from maasserver.models import Node
Node.objects.all()
node = Node.objects.all().first()
