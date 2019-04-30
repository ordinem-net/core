from essense.secondary.fs.json_files import JsonFiles
from const import Const


class ActionLearner(object):
    """Класс для выполнение сетевых запросов learner узла"""
    __json__ = JsonFiles()

    def _action(self, message):
        """
        Метод обработки запросов от других пользователей
        :param message: <obj> Объект запроса
        :return:
        """
        type_message = self.__json__.get_prop(message, 'header.type').split('_')

        if type_message[0] == 'learner':
            pass

        elif type_message[0] == 'user':
            if type_message[1] == 'check-action':
                print('CHECK ACTION!!!')
            elif type_message[1] == 'enter':
                print('ENTER!!!')
