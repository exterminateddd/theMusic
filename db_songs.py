from pymongo import MongoClient
from string import ascii_lowercase, ascii_uppercase
from random import choice
from utils import get_cnf

cluster = MongoClient(
    'mongodb+srv://main_exterminated:'+get_cnf()['mongo']['DBPassword']+'@cluster0.tj4ux.gcp.mongodb.net/tfp?retryWrites=true&w=majority',
    ssl=True,
    ssl_cert_reqs="CERT_NONE"
)
db = cluster.tfp.songs

alph = ascii_lowercase+ascii_uppercase+''.join([str(i) for i in range(10)])


def generate_unique_hash():
    generated_hash = ''.join([choice(alph) for i in range(12)])
    while generated_hash in [i['hash'] for i in get_all_songs()]:
        generated_hash = ''.join([choice(alph) for i in range(12)])
    return generated_hash


def get_all_songs():
    return [i for i in db.find({})]


def add_song(name: str, author: str):
    try:
        new_hash = generate_unique_hash()
        db.insert_one({
            'name': name,
            'author': author,
            'hash': new_hash
        })
    except:
        return False
    return True


def get_song_data(hash_: str):
    try:
        find = db.find_one({"hash": hash_})
        print(find)
        if find:
            return find
        else:
            raise Exception("!")
    except:
        return False

