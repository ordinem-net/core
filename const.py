import os


class Const(object):
    ROOT = os.getcwd()
    """
    -------------------------------------
               Константы пути
    -------------------------------------
    """
    PATH_TO_FILES = os.path.join(ROOT, 'data')

    PATH_TO_DATA = PATH_TO_FILES + '\\data.json'
    PATH_TO_ADDRESS = PATH_TO_FILES + '\\address.txt'
    PATH_TO_LIST = PATH_TO_FILES + '\\list'
    PATH_TO_TMP = PATH_TO_FILES + '\\tmp'
    PATH_TO_KEYS = PATH_TO_FILES + '\\keys'

    PATH_TO_LIST_USERS = PATH_TO_LIST + '\\users.json'
    PATH_TO_LIST_USERS_ACTION = PATH_TO_LIST + '\\action_users.json'
    PATH_TO_LIST_LEARNERS = PATH_TO_LIST + '\\learners.json'

    PATH_TO_TMP_USERS = PATH_TO_TMP + '\\users.json'

    PATH_TO_KEY_PUBLIC = PATH_TO_KEYS + '\\public_key.txt'
    PATH_TO_KEY_PRIVATE = PATH_TO_KEYS + '\\private_key.txt'

    """
    -------------------------------------
               Константы соединения
    -------------------------------------
    """

    """Порты"""
    PORT_LEARNER = 9000
    PORT_USER = 9001

    """Максимум подключаемых узлов"""
    LISTEN_LEARNER = 100
    LISTEN_USER = 50
