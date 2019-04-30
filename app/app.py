from flask import Flask
from Conf import ConfigApp

app = Flask(__name__)
app.config.from_object(ConfigApp)
