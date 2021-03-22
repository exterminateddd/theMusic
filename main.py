from flask import Flask, logging
from renderers import rnd
from api import api
from flask_logging import Filter


app = Flask(__name__)
filter = Filter('static')
app.secret_key = "secret_key"
app.register_blueprint(rnd)
app.register_blueprint(api)


if __name__ == '__main__':
    app.run(port=2001, debug=True)
