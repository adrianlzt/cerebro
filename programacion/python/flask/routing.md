from flask import Flask, request

@app.route('/grant')
def grant():
    pass

@app.route('/hello/', methods=['POST'])
def hello():
  name=request.form['yourname']
