import rsa
import base64
from const import const
from essense.secondary.fs.files import Files


class Keys:
    __files__ = Files()

    def generate_keys(self):
        """
        Метод для генерации ключей.
        Генерирует открытый и закрытый ключ и записывает их в файлы public_key.txt и private_key.txt
        """
        (__pubkey, __privkey) = rsa.newkeys(512)

        if not self.__files__.is_dir(const.PATH_TO_KEYS):
            self.__files__.create_directory(const.PATH_TO_KEYS)

        __pubkey_file = open(const.PATH_TO_KEY_PUBLIC, 'w')
        __privkey_file = open(const.PATH_TO_KEY_PRIVATE, 'w')

        __pubkey_file.write(__pubkey.save_pkcs1().decode('ascii'))
        __privkey_file.write(__privkey.save_pkcs1().decode('ascii'))

        return [__pubkey, __privkey]

    @staticmethod
    def pubkey_to_address(pubkey):
        """
        Метод преобразующий открытый ключ в адрес.
        В качестве параметра принимает открытый ключ и возвращает адрес в формате str.
        """
        __address = pubkey.encode('utf-8')
        address = base64.b64encode(__address).decode('utf-8')

        return address

    @staticmethod
    def address_to_pubkey(address):
        """
        Метод преобразующий адрес в открытый ключ.
        В качестве параметра принимает адрес и возвращает открытый ключ в формате str.
        """
        pubkey = base64.b64decode(address).decode('utf-8')

        return pubkey

    def get_keys(self, path_to_public_key=const.PATH_TO_KEY_PUBLIC, path_to_private_key=const.PATH_TO_KEY_PRIVATE):
        """
        Метод считывания ключей с базы.
        Возвращает массив, нулевой элемент - публичный ключ, первый элемент - приватный ключ.
        :param path_to_public_key: <str> Путь к публичному ключу
        :param path_to_private_key: <str> Путь к приватному ключу
        :return: <arr> кортеж из ключей
        """
        if not self.__files__.is_file(path_to_public_key) or \
                not self.__files__.is_file(path_to_private_key):
            return ['', '']

        __pubkey_file = open(path_to_public_key, 'r')
        __privkey_file = open(path_to_private_key, 'r')

        keys = [__pubkey_file.read(), __privkey_file.read()]

        return keys

    def sign_test(self):
        """
        Метод подписывающий тестовое сообщение. Необходимо для дальнейшей проверки транзакции другими пользователями.
        Возвращает подпись в формате str.
        """
        __to_privkey = self.get_keys()[1]
        __privkey = rsa.PrivateKey.load_pkcs1(__to_privkey)
        __message = '1970'

        __to_signature = rsa.sign(
            __message.encode('utf-8'), __privkey, 'SHA-1')
        signature = base64.b64encode(__to_signature)
        signature = signature.decode('utf-8')

        return signature

    def verify_pubkey(self, address, signature):
        """
        Метод подписывающий верифицирующий публичный ключ пользователя.
        В случае успешной проверки, возвращает True.
        """
        __message = '1970'

        pubkey = self.address_to_pubkey(address)

        if (rsa.verify(__message, signature, pubkey)) == 'SHA-1':
            return True
