import rsa
import base64


class Keys:

    def generate_keys():
        """
        Метод для генерации ключей.
        Генерирует открытый и закрытый ключ и записывает их в файлы public_key.txt и private_key.txt
        """
        # Если будут ошибки в дальнейшем, то сменить на 512.
        (__pubkey, __privkey) = rsa.newkeys(512)

        __pubkey_file = open('public_key.txt', 'w')
        __privkey_file = open('private_key.txt', 'w')

        __pubkey_file.write(__pubkey.save_pkcs1().decode('ascii'))
        __privkey_file.write(__privkey.save_pkcs1().decode('ascii'))

    def pubkey_to_address(pubkey):
        """
        Метод преобразующий открытый ключ в адрес.
        В качестве параметра принимает открытый ключ и возвращает адрес в формате str.
        """
        __address = pubkey.encode('utf-8')
        address = base64.b64encode(__address).decode('utf-8')

        return address

    def address_to_pubkey(address):
        """
        Метод преобразующий адрес в открытый ключ.
        В качестве параметра принимает адрес и возвращает открытый ключ в формате str.
        """
        pubkey = base64.b64decode(address).decode('utf-8')

        return pubkey

    def get_keys():
        """
        Метод считывания ключей с базы.
        Возвращает массив, нулевой элемент - публичный ключ, первый элемент - приватный ключ.
        """
        __pubkey_file = open('public_key.txt', 'r')
        __privkey_file = open('private_key.txt', 'r')

        keys = [__pubkey_file.read(), __privkey_file.read()]

        return keys

    def sign_test():
        """
        Метод подписывающий тестовое сообщение. Необходимо для дальнейшей проверки транзакции другими пользователями.
        Возвращает подпись в формате str.
        """
        __to_privkey = Keys.get_keys()[1]
        __privkey = rsa.PrivateKey.load_pkcs1(__to_privkey)
        __message = '1970'

        __to_signature = rsa.sign(
            __message.encode('utf-8'), __privkey, 'SHA-1')
        signature = base64.b64encode(__to_signature)
        signature = signature.decode('utf-8')

        return signature

    def verify_pubkey(address, signature):
        """
        Метод подписывающий верифицирующий публичный ключ пользователя.
        В случае успешной проверки, возвращает True.
        """
        __message = '1970'

        pubkey = Keys.address_to_pubkey(address)

        if ((rsa.verify(__message, signature, pubkey)) == 'SHA-1'):
            return True
