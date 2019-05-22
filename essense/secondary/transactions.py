from essense.secondary.keys import Keys
from const import const
import hashlib
import rsa
import base64


class Transactions:

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
        
        return transaction


    def verify_transaction(self,transaction):
        
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
