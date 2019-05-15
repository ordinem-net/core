from app.app import app
from app.view import *
from flask import request, redirect, url_for
from essense.secondary.fs.directorys import Directory
from essense.secondary.keys import Keys


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form

    (pubKey, privKey) = Keys().generate_keys()
    address = Keys().pubkey_to_address(pubKey)

    return redirect(url_for('message', type='registration'))


@app.route('/todo/login', methods=['GET', 'POST'])
def todo_login():
    form = request.form

    public_key = request.files.get('publicKey')
    private_key = request.files.get('privateKey')

    if not Directory().is_dir('data/tmp/key'):
        Directory().create_directory('data/tmp/key')

    public_key.save('data/tmp/key/public_key.txt')
    private_key.save('data/tmp/key/private_key.txt')

    return redirect(url_for('index'))
