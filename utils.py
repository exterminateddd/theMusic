from json import load
from random import choice
from string import ascii_lowercase, ascii_uppercase


SYMBOLS = ascii_lowercase + ascii_uppercase + ''.join([str(i) for i in range(10)])


def get_db_cnf():
    return load(open("./config.json", "r"))['mongo']


def get_app_cnf():
    return load(open("./config.json", "r"))['app']


def generate_unique_hash(excluded_list):
    generated_hash = ''.join([choice(SYMBOLS) for i in range(12)])
    while generated_hash in [i['hash'] for i in excluded_list]:
        generated_hash = ''.join([choice(SYMBOLS) for i in range(12)])
    return generated_hash

