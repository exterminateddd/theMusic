from flask import Blueprint, render_template

rnd = Blueprint('render_page', __name__, template_folder='templates')


@rnd.route('/signup')
def RENDER_registration():
    return render_template('registration.html')


@rnd.route('/')
def RENDER_root():
    # TODO
    return ''


@rnd.route('/feed')
def RENDER_feed():
    return render_template('feed.html')


@rnd.route('/login')
@rnd.route('/sign-in')
@rnd.route('/signin')
def RENDER_sign_in():
    return render_template('login.html')
