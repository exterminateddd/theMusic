from flask import Blueprint, jsonify, request, session
from db_users import reg_user, attempt_login, get_user, get_all_users
from db_songs import get_all_songs, get_song_data
from utils import get_app_cnf
from contextlib import suppress
from loguru import logger


api = Blueprint('api_module', __name__)


def set_session_user(name_):
    session.__setitem__("current_user", name_)


@api.route('/api/reg', methods=['POST'])
def reg():
    resp_json = {
        'success': True,
        'msg': ''
    }
    try:
        json_req = request.get_json(force=True)
        pw_ = json_req['pw']
        name_ = json_req['name']
        if not name_ or not pw_: raise KeyError("Username or Password not provided")
        reg_ = reg_user(name_, pw_)
        if reg_:
            resp_json['msg'] = "Register Successful!"
            set_session_user(name_)
        else:
            resp_json['msg'] = "User With Name "+name_+" Already Exists"
    except Exception as e:
        resp_json['success'] = False
        resp_json['msg'] = "ERROR_"+str(e.args[0])
    return jsonify(resp_json)


@api.route('/api/login', methods=['POST'])
def login():
    resp_json = {
        'success': False,
        'msg': ''
    }
    json_ = request.get_json(force=True)
    name_ = json_['name']
    pw_ = json_['pw']
    try:
        attlog = attempt_login(name_, pw_)
        resp_json['msg'] = 'LOGIN_SUCCESS'
        resp_json['success'] = True
        set_session_user(name_)
    except Exception as e:
        resp_json['msg'] = "ERROR_"+str(e.args[0])
    json_resp = jsonify(resp_json)
    return json_resp


@api.route('/api/get_app_data')
def get_app_data():
    resp_json = {
        "success": True,
        "data": {}
    }
    try:
        resp_json['data'] = get_app_cnf()
    except Exception as e:
        resp_json['success'] = False
    return resp_json


@api.route('/api/logout', methods=['GET'])
def logout():
    resp_json = {
        'success': True
    }
    try:
        set_session_user('')
    except:
        resp_json['success'] = False
    return jsonify(resp_json)


@api.route('/api/get_user_data/<string:name>', methods=['GET'])
def get_user_data(name: str):
    resp_json = {
        "success": False,
        "user_obj": {}
    }
    user_found = get_user(name)
    if not user_found:
        resp_json['success'] = False
    else:
        resp_json['user_obj'] = user_found

    return jsonify(resp_json)


@api.route('/api/get_session_user', methods=['GET'])
def get_session_user():
    resp_json = {
        "success": False,
        "user": ''
    }
    print(dict(session))
    try:
        resp_json["user"] = session['current_user']
        resp_json["success"] = True
    except Exception as e:
        resp_json['error'] = 'ERROR_'+str(e.args[0])
    return jsonify(resp_json)


@api.route('/api/get_all_songs', methods=['GET'])
def get_rec_songs():
    resp_json = {
        "success": False,
        "songs": []
    }
    with suppress(Exception):
        resp_json['songs'] = [{k: v for k, v in song.items() if k != "_id"} for song in get_all_songs()]
        resp_json['success'] = True
    print(resp_json)
    return jsonify(resp_json)


@api.route('/api/get_song_data/<string:hash_>', methods=['GET'])
def get_song_data_(hash_: str):
    resp_json = {
        "success": False,
        "info": {}
    }
    with suppress(Exception):
        resp_json['info'] = get_song_data(hash_)
        resp_json['info']['_id'] = 0
        resp_json['success'] = True
    return jsonify(resp_json)
