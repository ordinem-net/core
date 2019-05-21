from essense.secondary.transactions import Transactions
import time
import hashlib

class Blockchain:

    def new_block(self,transactions):

        timestamp = time.time()

        to_hash = str(timestamp) + str(transactions)
        to_hash = to_hash.encode('UTF-8')
        hash = hashlib.md5(to_hash).hexdigest()
        
        block = {
            'timestamp' : timestamp,
            'transactions' : transactions,
            'hash' : hash
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
        to_hash = str(timestamp) + str(transactions)
        to_hash = to_hash.encode('UTF-8')

        if (hashlib.md5(to_hash).hexdigest() != hash):
            return False
        
        return True
