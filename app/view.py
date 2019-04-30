from app.app import app
from flask import render_template, redirect, url_for


@app.route('/register')
def index():
    return render_template('index.html', no_header=True)


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register/user')
def register_user():
    return render_template('register_user.html')


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('index'))
