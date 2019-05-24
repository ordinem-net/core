from const import const
from essense.secondary.fs.json_files import JsonFiles
from essense.user import User
import os


class Mage(object):
    """Класс для функций, необходимых в самих шаблонах"""
    @staticmethod
    def action_user():
        if JsonFiles().is_zero_file(const.PATH_TO_DATA):
            return False

        return True

    @staticmethod
    def get_path_to_image(address, name_file):
        """
        Метод получения пути к нужному файлу отдельного пользователя
        :param address: <str> адрес пользователя
        :param name_file: <str> имя нужного файла
        :return: <str> Путь к файлу
        """
        users_list = JsonFiles().get_json(const.PATH_TO_BCH_USERS_MAP)

        if not users_list or not users_list[address]:
            return ''

        id_user = users_list[address]

        directory = os.path.join(const.PATH_TO_BCH_USERS, id_user, const.PATH_TO_USER_BUILD_FILES)
        path = os.path.join(const.PATH_TO_BCH_USERS, id_user, const.PATH_TO_USER_BUILD_FILES, name_file)

        if not JsonFiles().is_file(path):
            return ''

        dir_to = os.path.join(const.FLASK_STATIC_IMAGE_TMP, id_user)

        if not JsonFiles().is_file(os.path.join(dir_to, name_file)):
            JsonFiles().copy_file(name_file, directory, dir_to)

        return const.NAME_TMP + '/' + id_user + '/' + name_file

    @staticmethod
    def get_list_users():
        dirs = os.listdir(const.PATH_TO_BCH_USERS)
        list_users = []

        for el in dirs:
            path = os.path.join(const.PATH_TO_BCH_USERS, el)
            if os.path.isdir(path):
                data_path = os.path.join(path, const.PATH_TO_USER_INFO)

                data = JsonFiles().get_json(data_path)

                if JsonFiles().get_prop(data, 'main_info.role') == '0':
                    list_users.append({
                        "name": JsonFiles().get_prop(data, 'main_info.name'),
                        "profession": JsonFiles().get_prop(
                                        data,
                                        'public_info.profession.props.profession_name.value'
                        ),
                        "path": el
                    })

        return list_users
