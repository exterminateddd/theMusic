from flask import Flask
from renderers import rnd
from api import api
from admin import admin
from flask_logging import Filter


app = Flask(__name__)
static_filter = Filter('static')
app.secret_key = "secret_key"
app.register_blueprint(rnd)
app.register_blueprint(api)
app.register_blueprint(admin)


if __name__ == '__main__':
    app.run(port=2001, debug=True)
