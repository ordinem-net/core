import os
from essense.secondary.fs.directorys import Directory


class Files(Directory):
    """Класс для работы с файлами"""
    def __init__(self):
        super().__init__()

    def create_file(self, path_to_file):
        """Создает файл и производит все необходимые проверки

        Метод создает при необходимости все необходимые директории
        Если файл уже существует - он не пересоздается

        :param path_to_file: Путь к файлу
        :return:
        """
        path = os.path.dirname(path_to_file)

        if os.path.exists(path):
            if not os.path.exists(path_to_file):
                open(path_to_file, 'w').close()
        else:
            self.create_directory(path)
            open(path_to_file, 'w').close()

    @staticmethod
    def clear_file(path_to_file):
        """Очищает файл если он существует"""
        if not os.path.isfile(path_to_file):
            return ''

        open(path_to_file, 'w').close()

    @staticmethod
    def delete_file(path_to_file=''):
        """Метод для удаления файла"""
        if os.path.isfile(path_to_file):
            os.remove(path_to_file)

    def is_zero_file(self, path_to_file=''):
        """Метод проверки пустоты файла"""
        return (not self.is_file(path_to_file)) or os.path.getsize(path_to_file) == 0

    @staticmethod
    def is_file(path_to_file=''):
        """Метод проверки файла"""
        return os.path.isfile(path_to_file)
