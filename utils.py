from json import load


def get_cnf():
    return load(open("config.json", "r"))
