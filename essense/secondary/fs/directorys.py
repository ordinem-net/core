import os
import errno
import shutil


class Directory (object):
    """Класс для работы с директориями"""
    @staticmethod
    def create_directory(path=''):
        """Создает директорию

        :param path: Путь к директории
        :return: Ничего не возвращает
        """
        try:
            os.makedirs(path, exist_ok=True)
        except OSError as exception:
            if exception != errno.EEXIST:
                raise

    @staticmethod
    def delete_directory(path):
        """Метод удаления директории

        :param path: Путь к директории
        :return: Ничего не возвращает
        """
        shutil.rmtree(path, ignore_errors=False)

    @staticmethod
    def clear_directory(path):
        """Метод очистки директории

        Метод очищает все содержимое директории
        Включая все вложенне файлы и подкаталоги

        :param path: Путь к директории
        :return: Ничего не возвращает
        """
        for root, dirs, files in os.walk(path):
            for file in files:
                os.unlink(os.path.join(root, file))
            for directory in dirs:
                shutil.rmtree(os.path.join(root, directory))
