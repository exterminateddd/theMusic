from pymongo import MongoClient
from string import ascii_lowercase, ascii_uppercase
from utils import get_db_cnf, generate_unique_hash, get_db_key_env
from dotenv import load_dotenv, dotenv_values


load_dotenv()

db_key = get_db_key_env()

cluster = MongoClient(
    'mongodb+srv://main_exterminated:'+db_key+'@cluster0.tj4ux.gcp.mongodb.net/tfp?retryWrites=true&w=majority',
    ssl=True,
    ssl_cert_reqs="CERT_NONE"
)
db = cluster.tfp.songs

alph = ascii_lowercase+ascii_uppercase+''.join([str(i) for i in range(10)])


def get_all_songs():
    return [i for i in db.find({})]


def add_song(name: str, author: str):
    try:
        new_hash = generate_unique_hash(get_all_songs())
        db.insert_one({
            'name': name,
            'author': author,
            'hash': new_hash
        })
    except Exception:
        return False
    return True


def get_song_data(hash_: str):
    try:
        find = db.find_one({"hash": hash_})
        if find:
            return find
        raise Exception("")
    except Exception:
        return False
