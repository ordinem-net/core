from flask import Flask
from Conf import ConfigApp
from app.mage import Mage
from flask_socketio import SocketIO

app = Flask(__name__)
app.config.from_object(ConfigApp)
app.jinja_env.globals.update(Mage=Mage)
socket_io = SocketIO(app)
