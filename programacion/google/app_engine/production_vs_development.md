import os
print os.environ['SERVER_SOFTWARE']

def isDev()
  return "Development" in os.environ['SERVER_SOFTWARE']

def isGAE()
  return "Google App Engine" in os.environ['SERVER_SOFTWARE']


En desarrollo:
Development/2.0

En producción:
Google App Engine/1.9.30
