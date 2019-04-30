from essense.learner import Learner
from app.app import app
from app.view import *
from app.todo import *
from essense.secondary.decorators import thread


def client():
    app.run()


@thread
def server():
    learner = Learner()
    # learner.start()


if __name__ == '__main__':
    server()
    client()
