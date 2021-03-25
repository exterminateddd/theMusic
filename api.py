from flask import Blueprint, jsonify, request, session
from db_users import reg_user, attempt_login, get_user, get_all_users
from db_songs import get_all_songs, get_song_data
from time import sleep
from loguru import logger


api = Blueprint('api_module', __name__)


@api.route('/api/reg', methods=['POST'])
def reg():
    json_resp = {
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
            session.current_user = name_
            json_resp['msg'] = "Register Successful!"
            session.__setitem__("current_user", name_)
        else:
            json_resp['msg'] = "User With Name "+name_+" Already Exists"
    except Exception as ex:
        json_resp['success'] = False
        json_resp['msg'] = str(ex.args)
    return jsonify(json_resp)


@api.route('/api/login', methods=['POST'])
def login():
    session.permanent = True
    json_resp = {
        'success': False,
        'msg': ''
    }
    json_ = request.get_json(force=True)
    name_ = json_['name']
    pw_ = json_['pw']
    try:
        attlog = attempt_login(name_, pw_)
        json_resp['msg'] = 'LOGIN_SUCCESS'
        json_resp['success'] = True
        session.__setitem__("current_user", name_)
    except Exception as e:
        json_resp['msg'] = "ERROR_"+str(e.args[0])
    json_resp = jsonify(json_resp)
    json_resp.headers.add('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, x-auth")
    return json_resp


@api.route('/api/logout')
def logout():
    json_resp = {
        'success': True
    }
    try:
        session['current_user'] = ''
    except:
        json_resp['success'] = False
    return jsonify(json_resp)


@api.route('/api/get_user_data/<string:name>', methods=['GET'])
def get_user_data(name: str):
    resp_msg = {
        "success": False,
        "user_obj": {}
    }
    user_found = get_user(name)
    if not user_found:
        resp_msg['success'] = False
    else:
        resp_msg['user_obj'] = user_found

    return jsonify(resp_msg)


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
    try:
        resp_json['songs'] = [{k: v for k, v in song.items() if k != "_id"} for song in get_all_songs()]
        resp_json['success'] = True
    except:
        pass
    print(resp_json)
    sleep(5)
    return jsonify(resp_json)


@api.route('/api/get_song_data/<string:hash_>', methods=['GET'])
def get_song_data_(hash_: str):

    resp_json = {
        "success": False,
        "info": {}
    }
    try:
        resp_json['info'] = get_song_data(hash_)
        resp_json['info']['_id'] = 0
        resp_json['success'] = True
    except:
        pass
    return jsonify(resp_json)
