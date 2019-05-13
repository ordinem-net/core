from essense.learner import Learner
from app.app import app
from app.view import *
from app.todo import *
from essense.secondary.decorators import thread
from essense.secondary.fs.directorys import Directory


def client():
    app.run()


@thread
def server():
    Directory().clear_directory('data/tmp')
    learner = Learner()
    # learner.start()


if __name__ == '__main__':
    server()
    client()
