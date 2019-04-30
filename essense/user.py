from essense.secondary.network import Network
from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.decorators import *
from essense.action.user import ActionUser
from const import Const
import json


class User(ActionUser):
    __network__ = Network()
    __json__ = JsonFiles()

    def __init__(self):
        super().__init__()

        self.__active()

    @thread
    def server(self):
        """Запуск сервера на прослушку сети"""
        self.__network__.server(Const.PORT_USER, self.__get_message, Const.LISTEN_USER)

    def __get_message(self, message):
        """Метод обработки всех пришедших сообщений"""
        self._action(json.loads(message))

    def __active(self):
        """
        Метод, который сообщает сети о том, что он в сети
        :return: null
        """
        learners = self.__json__.get_json(Const.PATH_TO_LIST_LEARNERS)
        data = self.__json__.get_json(Const.PATH_TO_DATA)
        id_user = ''

        if data:
            if data.get('id'):
                id_user = data["id"]

        message = self.__network__.create_message(id_user, 'user_enter', {})

        for learner_id, learner_data in learners.items():
            self.__network__.send(learner_data["ip"], Const.PORT_LEARNER, message)
