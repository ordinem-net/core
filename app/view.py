from app.app import app
from flask import render_template, redirect, url_for, Markup
from app.mage import Mage


@app.route('/')
def index():
    return render_template('index.html', name='index', sockets=True)


@app.route('/register')
def register(error={}):
    return render_template('register.html', name='register', no_header=True, error=error)


@app.route('/login')
def login():
    return render_template('login.html', name='login', no_header=True)


@app.route('/message')
def message(mes={}):
    if not mes:
        pass
        # return redirect(url_for('index'))
    mes["title"] = 'Спасибо за регистрацию!'
    mes["body"] = Markup('<p class="message__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem laudantium, error recusandae quae quibusdam sunt aperiam, ullam modi alias corporis facere autem sed temporibus itaque perspiciatis ab eum provident eius.</p>')
    
    return render_template('message.html', name='message', message=mes)


@app.route('/admin')
def admin():
    if not Mage().action_user():
        return redirect(url_for('login'))

    return render_template('admin.html', name='admin')


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))

