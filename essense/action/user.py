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
        type_message = self.__json__.get_prop(message, 'header.type').split('_')

        if type_message[0] == 'lerner':
            if type_message[1] == 'check-active':
                self.__send_active(self.__json__.get_prop(message, 'header.id'), 'learner')

        #далее хрень какая та написана
        elif type_message[0] == 'transaction':
            transaction = self.__json__.get_prop(message, 'data')

            #TODO: Всё работает только если if True!!! Что то не так с проверкой транзакции
            if (Transactions().verify_transaction(transaction))== True:
                #Берём хеш транзакции и далее его хешируем
                #Это используется для наименования файлов
                transaction_hash = self.__json__.get_prop(message, 'data.hash')
                name_file_transaction = hashlib.sha1((transaction_hash).encode()).hexdigest()

                #TODO: Нужно по красивее сделать путь к папке (да и вообще не понятно правильно ли я прописал путь)
                #Кто нибудь помогите с путями!!!

                #Создаём файл
                path_transaction = '../../data/blockchain/raw_transactions/' + name_file_transaction +'.json'
                self.__files___.create_file(path_transaction)

                #Записываем транзакцию в файл
                self.__json__.set_json_in_file(path_transaction, transaction)

            else:
                pass

        elif type_message[0] == 'block':
            block = self.__json__.get_prop(message, 'data')


            #TODO: Опять что то не так с проверкой
            #if (self.__blockchain__.check_block(block)) == True:
            #if True:
            if (Blockchain().check_block(block)) == True:

                #Находим номер последнего элемента
                str_mass = os.listdir('../../data/blockchain/blocks')

                int_mass = []
                for name in str_mass:
                    int_mass.append(int(name[:-5]))


                # Уже не надо
                #int_mass = result = [int(item) for item in str_mass]
                last_item = max(int_mass)

                name_file_block = str(last_item + 1)
                path_block = '../../data/blockchain/blocks/' + name_file_block + '.json'
                self.__files___.create_file(path_block)
                self.__json__.set_json_in_file(path_block, block)

                #далее нужно пропарсить блок и найти транзакции созданий пользователей
                #что бы записать их в users

                #Это массив транзакций
                mass_transactions = self.__json__.get_prop(message, 'data.transactions')
                for transaction in mass_transactions:
                    type_transaction = self.__json__.get_prop(transaction, 'type')
                    if type_transaction == 'new_user':
                        #Создание директории
                        #user_address = self.__json__.get_prop(message, 'transaction.sender')
                        user_address = transaction["sender"]
                        user_address_hash = hashlib.sha1((user_address).encode()).hexdigest()
                        path_new_user_dir = '../../data/blockchain/users/' + user_address_hash #+'.json'
                        self.__directorys__.create_directory(path_new_user_dir)

                        #Создание файла и запись
                        path_new_user_file = path_new_user_dir + "/data.json"
                        self.__files___.create_file(path_new_user_file)
                        self.__json__.set_json_in_file(path_new_user_file, transaction["data"])

                        map_json = {"address": user_address,
                                    "hash_address": user_address_hash}
                        path_map = '../../data/blockchain/users/map.json'
                        self.__json__.set_json_in_file(path_map, map_json)

                        #Создание файлика с ключём
                        path_public_key = path_new_user_dir + '/public_key.txt'
                        self.__files___.create_file(path_public_key)
                        user_public_key = self.__keys__.address_to_pubkey(user_address)

                        public_key_txt = open(path_public_key, "w")
                        public_key_txt.write(user_public_key)
                        public_key_txt.close()

                    if type_transaction == 'update':
                        #Перезаписываем файл data
                        #address_update_user = self.__json__.get_prop(message, 'transaction.sender')
                        address_update_user = transaction["hash"]

                        address_update_user_dir = hashlib.sha1((address_update_user).encode()).hexdigest()
                        print(address_update_user_dir)
                        #Не знаю как перезаписать, так что просто удоляю и создаю заново
                        os.remove("../../data/blockchain/users/"+ address_update_user_dir+'/data.json')
                        self.__files___.create_file("../../data/blockchain/users/"+address_update_user_dir+'/data.json')
                        self.__json__.set_json_in_file("../../data/blockchain/users/"+address_update_user_dir+'/data.json', transaction["data"])




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


    #TODO: То что ниже не должно находиться в этом файле!!!!
    # Нужно отдельно сделать фалй и класс PARSER

    #Работает!
    def get_user_data(self, address):
        """
        Метод, который возвращает объект с данными пользователя
        :param address: Адрес пользователя
        :return: объект с данными пользователя
        """
        #data = self.__json__.get_json(const.PATH_TO_BCH_USERS_MAP) - TODO: Не робит!!!
        path = '../../data/blockchain/users/'+ str(address) + "/data.json"
        data = self.__json__.get_json(path)

        return data

    #Работает
    def get_user_transactions_by_type(self, address, type):
        """
        Метод который возвращает массив транзакций
        пользователя по типу
        :param address: адрес пользователя
        :param type: тип транзакции
        :return: массив транзакций
        """
        blocks_mass = os.listdir('../../data/blockchain/blocks')
        mass_hash = []
        for block in blocks_mass:
            path = '../../data/blockchain/blocks/' + block
            data = self.__json__.get_json(path)
            transactions = self.__json__.get_prop(data, 'transactions')

            for transaction in transactions:
                #print(transaction)
                #print(transaction["type"])
                #print(transaction["sender"])
                if (transaction["type"] == type) and (transaction["sender"] == address):
                    mass_hash.append(transaction)

                else:
                    pass

        return mass_hash

    def get_ip(self):
        data = self.__json__.get_json("../../data/IP/ip.json")
        mass_ip = data["ip_address"]

        return mass_ip


ac_us = ActionUser()
print(ac_us.get_ip())