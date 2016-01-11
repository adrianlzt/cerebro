http://www.django-rest-framework.org/

# Basico

from rest_framework.views import APIView
from rest_framework.response import Response

class RootController(APIView):
    def get(self, request):
        data = {"name": "API_NAME", "version": "API_VERSION"}
        return Response(data)
