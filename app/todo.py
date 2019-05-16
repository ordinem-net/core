from app.app import app
from app.view import *
from flask import request, redirect, url_for
from essense.secondary.fs.json_files import JsonFiles
from essense.secondary.keys import Keys


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form
    print(form)

    Keys().generate_keys()  # Создаем ключи
    keys = Keys().get_keys()  # Получаем их строковое представление
    address = Keys().pubkey_to_address(keys[0])  # Генерируем адресс
    JsonFiles().write_to_data(Const.PATH_TO_ADDRESS, address)  # Запись адреса
    get_users(address, form)  # Вносим данные

    return redirect(url_for('message', type='registration'))


@app.route('/todo/login', methods=['GET', 'POST'])
def todo_login():
    form = request.form

    public_key = request.files.get('publicKey')
    private_key = request.files.get('privateKey')

    if not JsonFiles().is_dir('data/tmp/key'):
        JsonFiles().create_directory('data/tmp/key')

    public_key.save('data/tmp/key/public_key.txt')
    private_key.save('data/tmp/key/private_key.txt')

    return redirect(url_for('index'))


def get_users(address, data={}):
    data = {
        "id": address,
        "info": data
    }

    JsonFiles().set_json_in_file(Const.PATH_TO_DATA, data)
