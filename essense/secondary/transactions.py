from essense.secondary.keys import Keys
from essense.secondary.network import Network
from const import const
import hashlib
import rsa
import base64
import json
from essense.secondary.decorators import *


class Transactions:
    @thread
    def new_transaction(self,type,data):
        """
        Метод для создания транзакции.
        Принимает тип транзакции и какие-либо данные в data.
        Результатом возвращает транзакцию.
        """

        pubkey = Keys().get_keys()[0]
        privkey = Keys().get_keys()[1]
        address = Keys().pubkey_to_address(pubkey)
        
        hash = hashlib.md5((str(type) + address + str(data)).encode('UTF-8')).hexdigest()
        
        signature = base64.b64encode(rsa.sign(hash.encode('utf-8'), rsa.PrivateKey.load_pkcs1(privkey), 'SHA-1')).decode('utf-8')
        
        transaction = {
            'type' : type,
            'hash' : hash,
            'sender' : address,
            'signature' : signature,
            'data' : data
        }
        message = Network().create_message(address,'transaction',transaction)
        Network().send('127.0.0.1',const.PORT_USER,message)
        return transaction


    def verify_transaction(self,transaction):
        """
        Метод для проверки транзакции.
        Принимает транзакцию.
        Результат проверки True или False.
        """
        
        hash = transaction.get('hash')
        sender = transaction.get('sender')
        signature = transaction.get('signature')
        data = transaction.get('data')
        type = transaction.get('type')
        
        _pubkey = Keys.address_to_pubkey(sender)

        new_hash = hashlib.md5((str(type) + sender + str(data)).encode('UTF-8')).hexdigest()
        
        try:
            pubkey = rsa.PublicKey.load_pkcs1(_pubkey)
            if (new_hash == hash):
                if ((rsa.verify(hash.encode('UTF-8'), base64.b64decode(signature), pubkey)) == 'SHA-1'):
                    return True
        except:
            return False

    def actions(self,transaction):
        if (Transactions().verify_transaction(transaction) == True):
            
            type = transaction.get('type')

            if (type == 'registration'):
                file = open(const.PATH_TO_LIST_USERS,'a')
                json.dump(transaction,file)
        
        return True
