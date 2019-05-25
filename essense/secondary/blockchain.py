from essense.secondary.transactions import Transactions
from essense.secondary.keys import Keys
from essense.secondary.network import Network
from const import const
import time
import hashlib
import rsa
import base64

class Blockchain:

    def new_block(self,transactions):
        """
        Метод создания блока.
        Принимает транзакции.
        Результатом возвращает блок.
        """

        timestamp = time.time()

        # Получаем хэш блока из основных элементов.
        hash = hashlib.md5((str(timestamp)+ str(transactions)).encode('UTF-8')).hexdigest()
        
        # Высчитываем nonce по условию.
        condition = '00000'  # Хэш должен начинаться с 5 нулей.
        nonce = 0
        hash_nonce = hash

        # Выпоняем цикл пока хэш не будет начинаться с нужного количества нулей.
        while (hash_nonce[0:len(condition)] != condition):
            nonce += 1
            hash_nonce = hashlib.md5((str(hash) + str(nonce)).encode('UTF-8')).hexdigest()
        
        pubkey = Keys().get_keys()[0]
        privkey = Keys().get_keys()[1]
        address = Keys().pubkey_to_address(pubkey)
        
        signature = base64.b64encode(rsa.sign(hash.encode('utf-8'), rsa.PrivateKey.load_pkcs1(privkey), 'SHA-1')).decode('utf-8')
        
        block = {
            'timestamp' : timestamp,
            'transactions' : transactions,
            'hash' : hash,
            'nonce': nonce,
            'miner' : address,
            'signature' : signature
        }
        
        message = Network().create_message(address,'block',block)
        Network().send('10.131.54.139',const.PORT_USER,message)
        
        return block
    
    def check_block(self,block):
        """
        Метод для проверки блока.
        Принимает блок.
        Результат проверки True или False.
        """

        transactions = block.get('transactions')
        signature = block.get('signature')
        miner = block.get('miner')
        _pubkey = Keys.address_to_pubkey(miner)
        block_flag = 0
        
        for i in range (len(transactions)):
            if (Transactions().verify_transaction(transactions[i]) == True):
                block_flag += 1
        
        if (block_flag != (len(transactions))):
            return False
        
        hash = block.get('hash')
        timestamp = block.get('timestamp')
        to_hash = hashlib.md5((str(timestamp)+ str(transactions)).encode('UTF-8')).hexdigest()

        if (to_hash != hash):
            return False
        
        # Проверяем nonce блока.
        nonce = block.get('nonce')
        condition = '00000'  # Хэш должен начинаться с 5 нулей.

        hash_nonce = hashlib.md5((hash + str(nonce)).encode('UTF-8')).hexdigest()
        
        if hash_nonce[0:len(condition)] != condition:
            return False
        
        try:
            pubkey = rsa.PublicKey.load_pkcs1(_pubkey)
            if ((rsa.verify(hash.encode('UTF-8'), base64.b64decode(signature), pubkey)) == 'SHA-1'):
                return True
        except:
            return False
        
        return True

