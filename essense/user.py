from essense.secondary.network import Network
from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.decorators import *
from essense.action.user import ActionUser
from const import const
import hashlib
import json
import os


class User(ActionUser):
    __network__ = Network()
    __json__ = JsonFiles()

    def __init__(self, action_server=False):
        super().__init__()

        if action_server:
            self.server()
            self.__active()

    @thread
    def server(self):
        """Запуск сервера на прослушку сети"""
        self.__network__.server(const.PORT_USER, self.__get_message, const.LISTEN_USER)

    def get_this_user_info(self):
        """Метод получения информации о данном пользователе"""
        return self.__json__.get_json(const.PATH_TO_DATA)

    def get_info_user(self, address=''):
        """
        Метод получения информации о пользователе. Если информация не была получена ранее,
        то она ищется в бокчейне
        :param address: <str> Адрес пользователя, о котором мы ищем информацию
        :return: <obj json> Вся известная информация о пользователе
        """
        if not address:
            return {}

        path_to_dir = self.__get_dir_user(address)

        if not path_to_dir:
            # TODO: тянем с блокчейна и т.д.
            pass

        if self.__json__.is_dir(path_to_dir):
            return self.__json__.get_json(os.path.join(path_to_dir, const.PATH_TO_USER_INFO))

    def create_user_dir(self, address, count=0):
        """
        Метод для создания директории, в которой будет хранится вся информация о нужном пользователе
        :param address: <str> адресс пользователя
        :param count: <int> смещение адреса, на случай если директория уже имеется
        :return: <str> имя созданной директории
        """
        map_users = {}

        if not self.__json__.is_file(const.PATH_TO_BCH_USERS_MAP):
            self.__json__.create_file(const.PATH_TO_BCH_USERS_MAP)
        else:
            map_users = self.__json__.get_json(const.PATH_TO_BCH_USERS_MAP)

        if map_users.get(address):
            return map_users.get(address)

        hash_address = hashlib.sha1((address + str(count) if count else '').encode()).hexdigest()

        for addr, key in map_users.items():
            if key == hash_address:
                count += 1
                return self.create_user_dir(address, count)

        map_users[address] = hash_address
        self.__json__.set_json_in_file(const.PATH_TO_BCH_USERS_MAP, map_users)

        path = os.path.join(const.PATH_TO_BCH_USERS, hash_address)
        self.__json__.create_directory(path)

        self.__json__.create_file(os.path.join(path, const.PATH_TO_USER_INFO))
        self.__json__.create_directory(os.path.join(path, const.PATH_TO_USER_PART_FILES))
        self.__json__.create_directory(os.path.join(path, const.PATH_TO_USER_BUILD_FILES))

        return hash_address

    def __get_dir_user(self, address):
        """
        Метод получения имени директории, в которой лежим информация о пользователе
        :param address: <str> адресс пользователя
        :return: <str> путь к директории
        """
        map_users = self.__json__.get_json(const.PATH_TO_BCH_USERS_MAP)

        if map_users.get(address):
            return os.path.join(const.PATH_TO_BCH_USERS, map_users.get(address))
        else:
            return ''

    def __get_message(self, message):
        """Метод обработки всех пришедших сообщений"""
        self._action(json.loads(message))

    def __active(self):
        """
        Метод, который сообщает сети о том, что он в сети
        :return: null
        """
        learners = self.__json__.get_json(const.PATH_TO_LIST_LEARNERS)
        data = self.__json__.get_json(const.PATH_TO_DATA)
        id_user = ''

        if data:
            if data.get('id'):
                id_user = data["id"]

        message = self.__network__.create_message(id_user, 'user_enter', {})

        for learner_id, learner_data in learners.items():
            self.__network__.send(learner_data["ip"], const.PORT_LEARNER, message)
