import os
import shutil
from essense.secondary.fs.directorys import Directory


class Files(Directory):
    """Класс для работы с файлами"""
    def __init__(self):
        super().__init__()

    def create_file(self, path_to_file):
        """Создает файл и производит все необходимые проверки

        Метод создает при необходимости все необходимые директории
        Если файл уже существует - он не пересоздается

        :param path_to_file: <str> Путь к файлу
        :return:
        """
        if self.is_dir_for_file(path_to_file):
            if not os.path.exists(path_to_file):
                open(path_to_file, 'w').close()
        else:
            self.create_directory(self.get_dir_for_file(path_to_file))
            open(path_to_file, 'w').close()

    def get_text(self, path_to_file=''):
        """
        Метод получения текса из файла
        :param path_to_file: <str> Путь к файлу
        :return: <str> Что находится в файле
        """
        if not self.is_file(path_to_file):
            return ''

        file = open(path_to_file, 'r')
        return file.read()

    def write_to_data(self, path_to_file='', data=''):
        """
        Метод записи текста в файл
        :param path_to_file: <str> Путь к файлу
        :param data: <str> Текст, который нужно записать в файл
        :return: <bool> Успешность апперации
        """
        if not data:
            return False

        if not self.is_file(path_to_file):
            self.create_file(path_to_file)

        with open(path_to_file, 'w') as file:
            file.write(data)

    def is_dir_for_file(self, path_to_file):
        """
        Метод проверки существования директории для данного файла
        :param path_to_file: <str> путь к файлу
        :return: <bool> Существование директории
        """
        return self.is_dir(self.get_dir_for_file(path_to_file))

    def copy_file(self, name_file, dir_from, dir_to):
        """
        Метод копирования файла из одной директории в другую
        :param name_file: <str> Имя файла
        :param dir_from: <str> Директория, в которой лежит файл
        :param dir_to: <str> Директория, в которую нужно скопировать файл
        :return: <str> Новый путь к файлу
        """
        path_from = os.path.join(dir_from, name_file)

        if not self.is_file(path_from):
            return ''

        path_to = os.path.join(dir_to, name_file)

        if not self.is_dir(dir_to):
            self.create_directory(dir_to)

        if self.is_file(path_to):
            return path_to

        shutil.copy(path_from, path_to)

        return path_to

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

    @staticmethod
    def get_dir_for_file(path_to_file):
        """
        Метод получения папки по пути к файлу
        :param path_to_file: <str> путь к файлу
        :return:  <str> путь к папке
        """
        return os.path.dirname(path_to_file)

