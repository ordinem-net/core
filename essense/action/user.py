from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.fs.directorys import Directory
from essense.secondary.network import Network
from const import const
from essense.secondary.transactions import Transactions
from essense.secondary.blockchain import Blockchain
from essense.secondary.fs.files import Files
from essense.secondary.keys import Keys
import hashlib
import os
import json


class ActionUser(object):
    """Класс для выполнение сетевых запросов user узла"""

    __json__ = JsonFiles()
    __network__ = Network()
    __files___ = Files()
    __directorys__ = Directory
    __keys__ = Keys

    def _action(self, message):
        """
        Метод обработки запросов от других пользователей
        :param message: <obj> Объект запроса
        :return:
        """
        print(message)
        type_message = self.__json__.get_prop(message, 'header.type').split('_')

        if type_message[0] == 'lerner':
            if type_message[1] == 'check-active':
                self.__send_active(self.__json__.get_prop(message, 'header.id'), 'learner')

        # далее хрень какая та написана
        elif type_message[0] == 'transaction':
            transaction = self.__json__.get_prop(message, 'data')

            # TODO: Всё работает только если if True!!! Что то не так с проверкой транзакции
            if Transactions().verify_transaction(transaction):
                # Берём хеш транзакции и далее его хешируем
                # Это используется для наименования файлов
                transaction_hash = self.__json__.get_prop(message, 'data.hash')
                name_file_transaction = hashlib.sha1(transaction_hash.encode()).hexdigest()

                # TODO: Нужно по красивее сделать путь к папке (да и вообще не понятно правильно ли я прописал путь)
                # Кто нибудь помогите с путями!!!

                # Создаём файл
                hash = self.create_user_dir(transaction["data"]["id"])
                path_transaction = os.path.join(const.PATH_TO_BCH_USERS, hash, const.PATH_TO_USER_INFO)
                # path_transaction = const.PATH_TO_BCH_RAW_TRANSACTION + '/' + name_file_transaction +'.json'
                self.__files___.create_file(path_transaction)

                # Записываем транзакцию в файл
                self.__json__.set_json_in_file(path_transaction, transaction["data"])

            else:
                pass

        elif type_message[0] == 'block':
            block = self.__json__.get_prop(message, 'data')

            # TODO: Опять что то не так с проверкой
            # if (self.__blockchain__.check_block(block)) == True:
            # if True:
            if Blockchain().check_block(block):

                # Находим номер последнего элемента
                str_mass = os.listdir(const.PATH_TO_BCH_BLOCKS)

                int_mass = []
                for name in str_mass:
                    int_mass.append(int(name[:-5]))

                # Уже не надо
                # int_mass = result = [int(item) for item in str_mass]
                last_item = max(int_mass)

                name_file_block = str(last_item + 1)
                path_block = const.PATH_TO_BCH_BLOCKS + '/' + name_file_block + '.json'
                self.__files___.create_file(path_block)
                self.__json__.set_json_in_file(path_block, block)

                # далее нужно пропарсить блок и найти транзакции созданий пользователей
                # что бы записать их в users

                # Это массив транзакций
                mass_transactions = self.__json__.get_prop(message, 'data.transactions')
                for transaction in mass_transactions:
                    type_transaction = self.__json__.get_prop(transaction, 'type')
                    if type_transaction == 'new_user':
                        # Создание директории
                        # user_address = self.__json__.get_prop(message, 'transaction.sender')
                        user_address = transaction["sender"]

                        hash_addr = self.create_user_dir(user_address)
                        self.__json__.set_json_in_file(
                            os.path.join(const.PATH_TO_BCH_USERS, hash_addr),
                            transaction["data"]
                        )

                        # Создание файлика с ключём
                        path_public_key = os.path.join(const.PATH_TO_BCH_USERS, hash_addr, 'public_key.txt')
                        self.__files___.create_file(path_public_key)
                        user_public_key = self.__keys__.address_to_pubkey(user_address)

                        public_key_txt = open(path_public_key, "w")
                        public_key_txt.write(user_public_key)
                        public_key_txt.close()


                    if type_transaction == 'update':
                        # Перезаписываем файл data
                        # address_update_user = self.__json__.get_prop(message, 'transaction.sender')
                        address_update_user = transaction["hash"]

                        address_update_user_dir = self.get_dir_user(address_update_user)
                        print(address_update_user_dir)
                        # Не знаю как перезаписать, так что просто удоляю и создаю заново

                        self.__files___.write_to_data(
                            os.path.join(const.PATH_TO_BCH_USERS, address_update_user_dir, const.PATH_TO_USER_INFO),
                            transaction["data"]
                        )

            else:
                pass

    def __send_active(self, id_answer, role='learner'):
        """
        Метод отправки ответа, что данный узел в сети
        :param id_answer: <str> id пользователя, который отправил запрос
        :param role: <str> Базовая роль пользователя (learner or user)
        :return: <bool> Успешность отправки ответа
        """
        data = self.__json__.get_json(const.PATH_TO_DATA)
        id_user = ''

        if data:
            if data.get('id'):
                id_user = data["id"]

        data_user = {}

        if role == 'learner':
            learners = self.__json__.get_json(const.PATH_TO_LIST_LEARNERS)
            data_user = learners[id_answer]

        message = self.__network__.create_message(id_user, 'user_check-action', {})
        success = self.__network__.send(
            data_user["ip"],
            const.PORT_LEARNER if role == 'learner' else const.PORT_USER,
            message
        )

        return True if success else False

    # TODO: То что ниже не должно находиться в этом файле!!!!
    # Нужно отдельно сделать фалй и класс PARSER

    # Работает!
    def get_user_data(self, address):
        """
        Метод, который возвращает объект с данными пользователя
        :param address: Адрес пользователя
        :return: объект с данными пользователя
        """
        # data = self.__json__.get_json(const.PATH_TO_BCH_USERS_MAP) - TODO: Не робит!!!
        path = os.path.join(const.PATH_TO_BCH_USERS, str(address), const.PATH_TO_USER_INFO)
        data = self.__json__.get_json(path)

        return data

    # Работает
    def get_user_transactions_by_type(self, address, type):
        """
        Метод который возвращает массив транзакций
        пользователя по типу
        :param address: адрес пользователя
        :param type: тип транзакции
        :return: массив транзакций
        """
        blocks_mass = os.listdir(const.PATH_TO_BCH_BLOCKS)
        mass_hash = []
        for block in blocks_mass:
            path = os.path.join(const.PATH_TO_BCH_BLOCKS, block)
            data = self.__json__.get_json(path)
            transactions = self.__json__.get_prop(data, 'transactions')

            for transaction in transactions:
                # print(transaction)
                # print(transaction["type"])
                # print(transaction["sender"])
                if (transaction["type"] == type) and (transaction["sender"] == address):
                    mass_hash.append(transaction)

                else:
                    pass

        return mass_hash

    def get_ip(self):
        # data = self.__json__.get_json("../../data/IP/ip.json")
        data = self.__json__.get_json(os.path.join(const.PATH_TO_FILES, 'IP', 'ip.json'))
        mass_ip = data["ip_address"]

        return mass_ip

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

    def get_dir_user(self, address):
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


ac_us = ActionUser()
print(ac_us.get_ip())