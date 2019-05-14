from essense.learner import Learner
from app.app import app, socket_io
from app.view import *
from app.todo import *
from app.sockets import *
from essense.secondary.decorators import thread
from essense.secondary.fs.directorys import Directory


def client():
    # app.run()
    socket_io.run(app)


@thread
def server():
    Directory().clear_directory('data/tmp')
    learner = Learner()
    # learner.start()


if __name__ == '__main__':
    server()
    client()
