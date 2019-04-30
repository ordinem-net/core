from essense.secondary.fs.json_files import JsonFiles
from essense.action.learner import ActionLearner
from essense.secondary.network import Network
from essense.secondary.decorators import *
from const import Const
import json


class Learner(ActionLearner):
    """
    Класс доверенного узла
    """
    __PAUSE_CHECK_USERS__ = 10  # Задержка проверки сети на наличие пользователей (в секундах)

    __network__ = Network()  # Свойство для работы с сетью
    __json__ = JsonFiles()  # Свойство для работы с json файлами

    def __init__(self, start=False):
        super().__init__()
        self.__clear_start_files()

        if start:
            self.start()

    def start(self):
        """Метод запуска основных функций learner"""
        self.__server()
        self.check_network()

    @thread
    def check_network(self):
        """Метод проверки всех узлов на наличие в сети.
        Запускается в отдельном потоке и в бесконечном цикле запускает метод проверки
        Метод проверки запускается с паузой, останавливая данный поток
        """
        print('CHECK NETWORK START...')
        while True:
            self.__check_network()

    @thread
    def __server(self):
        """Запуск сервера на прослушку сети"""
        self.__network__.server(Const.PORT_LEARNER, self.__get_message, Const.LISTEN_LEARNER)

    @pause(__PAUSE_CHECK_USERS__)
    @thread
    def __check_network(self):
        users = self.__json__.get_json(Const.PATH_TO_LIST_USERS)
        data = self.__json__.get_json(Const.PATH_TO_DATA)

        if not users:
            return

        id_learner = ''
        if data:
            if data.get('id'):
                id_learner = data["id"]

        dis_active_users = []
        active_users = {}

        for id_user, data_user in users.items():
            message = self.__network__.create_message(id_learner, "lerner_check-active", {})
            success = self.__network__.send(data_user["ip"], Const.PORT_USER, message)

            if success:
                active_users[id_user] = data_user
            else:
                dis_active_users.append(id_user)

        print('action users: ' + str(len(active_users)))

        change = self.verify_action_users(active_users, dis_active_users)
        print(change)

    def verify_action_users(self, action_users, dis_active_users):
        """
        Метод проверки изменения активности пользователей
        Если какой-то пользователь зашел в сеть или же наоборот вышел, то данные об этом обновляются
        :param action_users: <obj> json объект активных пользователей
        :param dis_active_users: <arr str> Массив id пользователей, которые сейчас не в сети
        :return: <obj> json объект, в котором указаны изменния активности
        """
        change = {"action": [], "dis_active": []}
        users = self.__json__.get_json(Const.PATH_TO_LIST_USERS_ACTION)

        for id_user, data in action_users.items():
            if not users.get(id_user):
                change["action"].append(id_user)
                users[id_user] = data

        for id_user in dis_active_users:
            if not users.get(id_user) is None:
                change["dis_active"].append(id_user)
                del users[id_user]

        if change["action"] or change["dis_active"]:
            self.__json__.set_json_in_file(Const.PATH_TO_TMP_USERS, action_users)

        return change

    def __get_message(self, message):
        """Метод обработки всех пришедших сообщений"""
        self._action(json.loads(message))

    def __clear_start_files(self):
        """Очистка файлов и дерикторий, оставшихся после последнего запуска"""
        self.__json__.delete_file(Const.PATH_TO_LIST_USERS_ACTION)
        self.__json__.clear_directory(Const.PATH_TO_TMP)
