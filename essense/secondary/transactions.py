from essense.secondary.keys import Keys
from const import const
import hashlib
import rsa
import base64


class Transactions:

    def new_transaction(self,data):

        pubkey = Keys().get_keys()[0]
        privkey = Keys().get_keys()[1]
        address = Keys().pubkey_to_address(pubkey)
        
        _hash = address + str(data)
        _hash = _hash.encode('UTF-8')
        hash = hashlib.md5(_hash).hexdigest()
        
        _signature = rsa.sign(hash.encode('utf-8'), rsa.PrivateKey.load_pkcs1(privkey), 'SHA-1')
        signature = base64.b64encode(_signature).decode('utf-8')
        
        transaction = {
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
        
        _pubkey = Keys.address_to_pubkey(sender)

        _new_hash = str(sender) + str(data)
        _new_hash = _new_hash.encode('UTF-8')
        n_hash = hashlib.md5(_new_hash).hexdigest()
        
        try:
            pubkey = rsa.PublicKey.load_pkcs1(_pubkey)
            if (n_hash == hash):
                if ((rsa.verify(hash.encode('UTF-8'), base64.b64decode(signature), pubkey)) == 'SHA-1'):
                    return True
        except:
            return False
