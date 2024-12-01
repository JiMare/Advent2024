

def get_data(path):
    with open(path, 'r', encoding='utf-8') as file:
        return file.read().splitlines()
