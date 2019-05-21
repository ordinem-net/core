from app.app import app
from app.view import *
from flask import request, redirect, url_for, jsonify
from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.keys import Keys
from essense.user import User
import os


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form

    Keys().generate_keys()  # Создаем ключи
    keys = Keys().get_keys()  # Получаем их строковое представление
    address = Keys().pubkey_to_address(keys[0])  # Генерируем адресс
    JsonFiles().write_to_data(const.PATH_TO_ADDRESS, address)  # Запись адреса
    data = get_users(address, form)  # Вносим данные

    path_to_dir = User().create_user_dir(address)  # Создаем папку для пользователя
    JsonFiles().write_to_data(os.path.join(const.PATH_TO_BCH_USERS, path_to_dir, 'public_key.txt'), keys[0])  # Пишем туда ключ
    JsonFiles().set_json_in_file(os.path.join(const.PATH_TO_BCH_USERS, path_to_dir, const.PATH_TO_USER_INFO), data)

    return redirect(url_for('message', type='registration'))


@app.route('/todo/login', methods=['GET', 'POST'])
def todo_login():
    public_key = request.files.get('publicKey')
    private_key = request.files.get('privateKey')
    address = request.files.get('address')

    if not public_key or not private_key or not address:
        return redirect(url_for('login', error='Один из файлов не был получен!'))

    if not JsonFiles().is_dir(const.PATH_TO_TMP_LOGIN):
        JsonFiles().create_directory(const.PATH_TO_TMP_LOGIN)

    public_key.save(os.path.join(const.PATH_TO_TMP_LOGIN, 'public_key.txt'))
    private_key.save(os.path.join(const.PATH_TO_TMP_LOGIN, 'private_key.txt'))
    address.save(os.path.join(const.PATH_TO_TMP_LOGIN, 'address.txt'))

    keys = Keys().get_keys(os.path.join(const.PATH_TO_TMP_LOGIN, 'public_key.txt'),
                           os.path.join(const.PATH_TO_TMP_LOGIN, 'private_key.txt'))

    address = JsonFiles().get_text(os.path.join(const.PATH_TO_TMP_LOGIN, 'address.txt'))

    if not address == Keys().pubkey_to_address(keys[0]):
        return redirect(url_for('login', error='Данный публичный ключ не соответсвует адресу!'))

    data = User().get_info_user(address)

    if data:
        JsonFiles().set_json_in_file(const.PATH_TO_DATA, data)
    else:
        return redirect(url_for('login', error='Такой пользователь не найден!'))

    return redirect(url_for('admin'))


@app.route('/todo/edit_profile', methods=['GET', 'POST'])
def todo_edit_profile():
    data = request.json

    user_info = JsonFiles().get_json(const.PATH_TO_DATA)

    user_info_new = user_info
    if data["type"] == 'public_info':
        user_info_new = get_edit_data_user_public(data, user_info)

    JsonFiles().set_json_in_file(const.PATH_TO_DATA, user_info_new)

    name_dir = User().get_dir_user(user_info['id'])
    JsonFiles().set_json_in_file(
        os.path.join(const.PATH_TO_USER_INFO, name_dir, const.PATH_TO_USER_INFO),
        user_info_new
    )

    return jsonify({'status': 'ok'})


def get_users(address, data):
    data_info = User().create_user_object(address, data)

    JsonFiles().set_json_in_file(const.PATH_TO_DATA, data_info)

    return data_info


def get_edit_data_user_public(data, data_user):
    for name, value in data.items():
        if name == 'about_us':
            data_user['about_us'] = value

        elif not name == 'type':
            for name_attr, value_attr in value.items():
                data_user['public_info'][name]['props'][name_attr]['value'] = value_attr
            if 'name' in value:
                data_user['main_info']['name'] = value['name']

    return data_user
