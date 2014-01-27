http://flask.pocoo.org/

Flask is a microframework for Python based on Werkzeug, Jinja 2 and good intentions. 
 


from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
