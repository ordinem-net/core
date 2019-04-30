from app.app import app
from app.view import *
from flask import jsonify, request, redirect, url_for


@app.route('/todo/register', methods=['GET', 'POST'])
def todo_register():
    form = request.form

    if form.get('role') == '0':
        return redirect(url_for('register_user'))

    return redirect(url_for('login'))
