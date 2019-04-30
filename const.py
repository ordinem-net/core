class Const(object):
    """
    -------------------------------------
               Константы пути
    -------------------------------------
    """
    PATH_TO_FILES = './data'

    PATH_TO_DATA = PATH_TO_FILES + '/data.json'
    PATH_TO_LIST = PATH_TO_FILES + '/list'
    PATH_TO_TMP = PATH_TO_FILES + '/tmp'

    PATH_TO_LIST_USERS = PATH_TO_LIST + '/users.json'
    PATH_TO_LIST_USERS_ACTION = PATH_TO_LIST + '/action_users.json'
    PATH_TO_LIST_LEARNERS = PATH_TO_LIST + '/learners.json'

    PATH_TO_TMP_USERS = PATH_TO_TMP + '/users.json'

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
