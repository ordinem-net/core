import os


class Const(object):
    ROOT = os.getcwd()

    NAME_TMP = 'tmp'
    """
    -------------------------------------
               Константы пути
    -------------------------------------
    """

    """Локальные файлы"""
    PATH_TO_FILES = os.path.join(ROOT, 'data')

    PATH_TO_DATA = os.path.join(PATH_TO_FILES, 'data.json')
    PATH_TO_ADDRESS = os.path.join(PATH_TO_FILES, 'address.txt')
    PATH_TO_CONFIG_EDIT_USER = os.path.join(PATH_TO_FILES, 'user_edit.json')
    PATH_TO_LIST = os.path.join(PATH_TO_FILES, 'list')
    PATH_TO_TMP = os.path.join(PATH_TO_FILES, NAME_TMP)
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
    PATH_TO_BCH_USERS_MAP = os.path.join(PATH_TO_BCH_USERS, 'map.json')  # карта директорий для конкретных адресов

    PATH_TO_BCH_BLOCKS = os.path.join(PATH_TO_BCH, 'blocks')
    PATH_TO_BCH_RAW_TRANSACTION = os.path.join(PATH_TO_BCH, 'raw_transactions')

    """Файлы пользователя"""
    PATH_TO_USER_INFO = 'data.json'
    PATH_TO_USER_PART_FILES = 'files'  # Все куски, для этого пользователя, полученные на хранение
    PATH_TO_USER_BUILD_FILES = 'build_files'  # Ранее собранные целые файлы

    """Для фронта"""
    FLASK_STATIC = os.path.join(ROOT, 'app', 'static')
    FLASK_STATIC_IMAGE = os.path.join(FLASK_STATIC, 'img')
    FLASK_STATIC_IMAGE_TMP = os.path.join(FLASK_STATIC_IMAGE, NAME_TMP)

    TMP = [
        FLASK_STATIC_IMAGE_TMP,
        PATH_TO_TMP
    ]

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
