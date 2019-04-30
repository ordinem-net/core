from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.network import Network
from const import Const


class ActionUser(object):
    """Класс для выполнение сетевых запросов user узла"""

    __json__ = JsonFiles()
    __network__ = Network()

    def _action(self, message):
        """
        Метод обработки запросов от других пользователей
        :param message: <obj> Объект запроса
        :return:
        """
        type_message = self.__json__.get_prop(message, 'header.type').split('_')

        if type_message[0] == 'lerner':
            if type_message[1] == 'check-active':
                self.__send_active(self.__json__.get_prop(message, 'header.id'), 'learner')

    def __send_active(self, id_answer, role='learner'):
        """
        Метод отправки ответа, что данный узел в сети
        :param id_answer: <str> id пользователя, который отправил запрос
        :param role: <str> Базовая роль пользователя (learner or user)
        :return: <bool> Успешность отправки ответа
        """
        data = self.__json__.get_json(Const.PATH_TO_DATA)
        id_user = ''

        if data:
            if data.get('id'):
                id_user = data["id"]

        data_user = {}

        if role == 'learner':
            learners = self.__json__.get_json(Const.PATH_TO_LIST_LEARNERS)
            data_user = learners[id_answer]

        message = self.__network__.create_message(id_user, 'user_check-action', {})
        success = self.__network__.send(
            data_user["ip"],
            Const.PORT_LEARNER if role == 'learner' else Const.PORT_USER,
            message
        )

        return True if success else False
