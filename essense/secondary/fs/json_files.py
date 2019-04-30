import json

from essense.secondary.fs.files import Files


class JsonFiles(Files):
    def __init__(self):
        """Метод инициализации объекта"""
        super().__init__()

    def get_json(self, path_to_file=''):
        """
        Метод получения json объекта из файла. Если он пуст или его нет - возвращается пустой объект
        :param path_to_file: <str> путь к файлу
        :return: <json obj> Json объект
        """
        if self.is_zero_file(path_to_file):
            return {}

        with open(path_to_file, 'r') as file:
            value = json.load(file)

        return value

    def set_json_in_file(self, path_to_file, data):
        """
        Метод записи json объекта в файл
        :param path_to_file: <str> путь к файлу
        :param data: <obj> json объект, вносимый в файл
        :return: <bool> Успешность опперации
        """
        if not self.is_file(path_to_file):
            self.create_file(path_to_file)

        with open(path_to_file, 'w') as file:
            json.dump(data, file)

        return True

    def set_prop(self, data, prop, value):
        """
        Метод добавления или изменения нового свойства в объекте
        :param data: <json obg> Объект, в который нужно вставить свойство
        :param prop: <str> Строка описания пути в объекте
        :param value: <all> Значение свойства
        :return: <bool> Успешность опперации
        """
        path = str(prop).split('.', 1)

        if len(path) == 1:
            if not path[0]:
                return data

            if data.get(path[0]):
                data[path[0]] = value
            else:
                data[path[0]] = {}
                data[path[0]] = value
        else:
            if data.get(path[0]):
                data[path[0]] = self.set_prop(data[path[0]], path[1], value)
            else:
                data[path[0]] = {}
                data[path[0]] = self.set_prop(data[path[0]], path[1], value)

        return data

    def get_prop(self, data, prop):
        """
        Метод получения значения свойства по его пути
        :param data:  <json obg> Объект, из которого нужно получить свойство
        :param prop: <str> Строка описания пути в объекте
        :return: <all> значение свойства
        """
        if not data:
            return {}

        path = str(prop).split('.', 1)

        if len(path) == 1:
            return data[path[0]] if data.get(path[0]) else {}
        else:
            return self.get_prop(data[path[0]], path[1])
