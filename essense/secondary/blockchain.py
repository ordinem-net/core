from essense.secondary.transactions import Transactions
import time
import hashlib

class Blockchain:

    def new_block(self,transactions):

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
        
        block = {
            'timestamp' : timestamp,
            'transactions' : transactions,
            'hash' : hash,
            'nonce': nonce
        }
        
        return block
    
    def check_block(self,block):

        transactions = block.get('transactions')
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
        
        return True
