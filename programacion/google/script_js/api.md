https://developers.google.com/apps-script/guides/rest/

También podemos llamar desde fuera directamente a nuestra google app script.


# Python
https://developers.google.com/apps-script/guides/rest/quickstart/python
response = service.scripts().run(body=request, scriptId=SCRIPT_ID).execute()
