from app.app import app
from app.view import *
from flask import request, redirect, url_for
from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.keys import Keys
import os


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form

    Keys().generate_keys()  # Создаем ключи
    keys = Keys().get_keys()  # Получаем их строковое представление
    address = Keys().pubkey_to_address(keys[0])  # Генерируем адресс
    JsonFiles().write_to_data(const.PATH_TO_ADDRESS, address)  # Запись адреса
    get_users(address, form)  # Вносим данные

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

    return redirect(url_for('index'))


def get_users(address, data):
    data = {
        "id": address,
        "info": data
    }

    JsonFiles().set_json_in_file(const.PATH_TO_DATA, data)
