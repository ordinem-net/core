from app.app import app
from app.view import *
from flask import jsonify, request, redirect, url_for
from essense.secondary.fs.directorys import Directory


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form

    if form.get('role') == '0':
        return redirect(url_for('register'))

    return redirect(url_for('index'))


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
