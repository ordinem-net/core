from app.app import socket_io
from flask_socketio import send


@socket_io.on('test', namespace='/test')
def handle_test(message):
    print(message)
    send('aaaaaaaaaaaaaaaa')
