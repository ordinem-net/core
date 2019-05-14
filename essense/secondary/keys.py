import rsa
import base64


class Keys:

    def generate_keys():
        """
        Метод для генерации ключей.
        Генерирует открытый и закрытый ключ и записывает их в файлы public_key.txt и private_key.txt
        """
        # Если будут ошибки в дальнейшем, то сменить на 512.
        (__pubkey, __privkey) = rsa.newkeys(128)

        __pubkey_file = open('public_key.txt', 'w')
        __privkey_file = open('private_key.txt', 'w')

        __pubkey_file.write(str(__pubkey))
        __privkey_file.write(str(__privkey))

    def publickey_to_login(pubkey):
        """
        Метод преобразующий открытый ключ в адрес.
        В качестве параметра принимает открытый ключ и возвращает адрес в формате str.
        """
        __address = pubkey.encode('utf-8')
        address = base64.b64encode(__address).decode('utf-8')

        return address

    def verify_key():
        pass

    def get_keys():
        """
        Метод считывания ключей с базы.
        Возвращает массив, нулевой элемент - публичный ключ, первый элемент - приватный ключ.
        """
        __pubkey_file = open('public_key.txt', 'r')
        __privkey_file = open('private_key.txt', 'r')

        keys = [__pubkey_file.readline(), __privkey_file.readline()]

        return keys
