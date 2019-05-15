from app.app import app
from flask import render_template, redirect, url_for, Markup, request
from app.mage import Mage
from const import Const
import os


@app.route('/')
def index():
    return render_template('index.html', name='index', sockets=True)


@app.route('/register')
def register(error={}):
    return render_template('register.html', name='register', no_header=True, error=error)


@app.route('/login')
def login():
    return render_template('login.html', name='login', no_header=True)


@app.route('/message', methods=['POST', 'GET'])
def message():
    type_message = request.args.get('type')

    if not type_message:
        return redirect(url_for('index'))

    address = 'sadasdas'
    mes = ''

    if type_message == 'registration':
        mes = {
        "title": "Спасибо за регистрацию!",
        "body": Markup('''
            <p class="message__text">Мы рад видеть нового пользователя нашего приложения! (Придумай что-то нормальное)</p>
            <p class="message__text">Ваш адрес в сети: {0} </p>
            <p class="message__text">Ваши ключи находятся: {1} </p>
            '''.format(address,
                       os.path.join(os.getcwd(), Const.PATH_TO_KEYS)
                       ))
        }

    if not mes:
        return redirect(url_for('index'))

    return render_template('message.html', name='message', message=mes)


@app.route('/admin')
def admin():
    if not Mage().action_user():
        return redirect(url_for('login'))

    return render_template('admin.html', name='admin')


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))

