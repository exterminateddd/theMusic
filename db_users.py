from pymongo import MongoClient
import hashlib

cluster = MongoClient(
    'mongodb+srv://main_exterminated:******@cluster0.tj4ux.gcp.mongodb.net/tfp?retryWrites=true&w=majority'
)
db = cluster.tfp.users


def hs(string):
    return hashlib.sha256(string.encode('utf-8')).hexdigest()


def get_all_users():
    return [i for i in db.find({})]


def check_if_user_exists_by_name(name):
    f_ = db.find_one({'name': name})
    return f_ if f_ else None


def reg_user(name, pw):
    try:
        if check_if_user_exists_by_name(name): raise Exception('USER_EXISTS')
        user = db.insert({
            'name': name,
            'pw': hs(pw)
        })
        if user:
            return user
        else:
            raise Exception("UNABLE_TO_REGISTER")
    except () as e:
        return False


def attempt_login(name, pw):
    user = dict(db.find_one({
        'name': name
    }))
    if not user:
        raise Exception("USER_NOT_EXISTS")
    if user['pw'] != hs(pw): raise Exception("PASSWORD_INCORRECT")
    return True


def get_user(name):
    user_ = dict(db.find_one({"name": name}))
    return user_ if user_ else False
