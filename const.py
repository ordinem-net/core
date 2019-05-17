import os


class Const(object):
    ROOT = os.getcwd()
    """
    -------------------------------------
               Константы пути
    -------------------------------------
    """

    """Локальные файлы"""
    PATH_TO_FILES = os.path.join(ROOT, 'data')

    PATH_TO_DATA = os.path.join(PATH_TO_FILES, 'data.json')
    PATH_TO_ADDRESS = os.path.join(PATH_TO_FILES, 'address.txt')
    PATH_TO_LIST = os.path.join(PATH_TO_FILES, 'list')
    PATH_TO_TMP = os.path.join(PATH_TO_FILES, 'tmp')
    PATH_TO_KEYS = os.path.join(PATH_TO_FILES, 'keys')

    PATH_TO_LIST_USERS = os.path.join(PATH_TO_LIST, 'users.json')
    PATH_TO_LIST_USERS_ACTION = os.path.join(PATH_TO_LIST, 'action_users.json')
    PATH_TO_LIST_LEARNERS = os.path.join(PATH_TO_LIST, 'learners.json')

    PATH_TO_TMP_USERS = os.path.join(PATH_TO_TMP, 'users.json')
    PATH_TO_TMP_LOGIN = os.path.join(PATH_TO_TMP, 'login')

    PATH_TO_KEY_PUBLIC = os.path.join(PATH_TO_KEYS, 'public_key.txt')
    PATH_TO_KEY_PRIVATE = os.path.join(PATH_TO_KEYS, 'private_key.txt')

    """Файлы сети"""
    PATH_TO_BCH = os.path.join(PATH_TO_FILES, 'blockchain')

    PATH_TO_BCH_USERS = os.path.join(PATH_TO_BCH, 'users')  # Загруженная ранее информация о пользователях

    """Файлы пользователя"""
    PATH_TO_USER_INFO = 'data.json'
    PATH_TO_USER_PART_FILES = 'files'  # Все куски, для этого пользователя, полученные на хранение
    PATH_TO_USER_BUILD_FILES = 'build_files'  # Ранее собранные целые файлы

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


const = Const()
