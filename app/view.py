from app.app import app
from flask import render_template, redirect, url_for


@app.route('/')
def index():
    return render_template('index.html', name='index')


@app.route('/register')
def register(error={}):
    return render_template('register.html', name='register', no_header=True, error=error)


@app.route('/login')
def login():
    return render_template('login.html', name='login', no_header=True)


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))
