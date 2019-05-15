from const import Const
from essense.secondary.fs.json_files import JsonFiles


class Mage(object):
    """Класс для функций, необходимых в самих шаблонах"""
    @staticmethod
    def action_user():
        if JsonFiles().is_zero_file(Const.PATH_TO_DATA):
            return False

        return True
