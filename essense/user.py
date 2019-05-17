from essense.secondary.network import Network
from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.decorators import *
from essense.action.user import ActionUser
from const import const
import json


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

    def get_user_info(self):
        """Метод получения информации о данном пользователе"""
        return self.__json__.get_json(const.PATH_TO_DATA)

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
