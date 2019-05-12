from app.app import app
from app.view import *
from flask import jsonify, request, redirect, url_for


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form

    if form.get('role') == '0':
        return redirect(url_for('register'))

    return redirect(url_for('index'))


@app.route('/todo/login', methods=['GET', 'POST'])
def todo_login():
    form = request.form
    print(form)

    return redirect(url_for('index'))
