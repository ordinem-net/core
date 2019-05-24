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

    @staticmethod
    def create_user_object(address, data):
        """
        Метод создания базового образца обхекта пользователя
        :param address: <str> Сгенерированный адрес пользователя
        :param data: <obj json|dict> Информация о пользователе
        :return: <obj json|dict> Объект со всему необходимыми данными
        """
        return {
            "id": address,
            "main_info": {
                "name": data.get('name'),
                "role": data.get('role'),
                "user_photo": "",
            },
            "public_info": {
                "age_and_gender": {
                    "title": "Возраст и пол",
                    "props": {
                        "age": {
                            "title": "Возраст",
                            "value": ""
                        },
                        "gender": {
                            "title": "Пол",
                            "value": "m",
                            "description": {
                                "m": "Мужской",
                                "w": "Женский"
                            }
                        }
                    }
                },
                "contact_info": {
                    "title": "Контактнная информация",
                    "props": {
                        "phone": {
                            "title": "Телефон",
                            "value": ""
                        },
                        "email": {
                            "title": "Почта",
                            "value": ""
                        }
                    }
                },
                "profession": {
                    "title": "Сфера деятельности",
                    "props": {
                        "profession_name": {
                            "title": "Профессия",
                            "value": ""
                        }
                    }
                }
            },
            "about_us": {},
            "sections": []
        }

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

        path_to_dir = self.get_dir_user(address)

        if not path_to_dir:
            # TODO: тянем с блокчейна и т.д.
            pass

        if self.__json__.is_dir(path_to_dir):
            return self.__json__.get_json(os.path.join(path_to_dir, const.PATH_TO_USER_INFO))

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
