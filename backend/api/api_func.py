import requests

# search component
# move to react
def get_list(search):
    search = search.replace(" ", "%20")
    print(search)
    url = f"https://openlibrary.org/search.json?q={search}"
    response = requests.get(url)
    data = response.json()

    x = data["docs"][:5]
    return x



# move into react dont display in card, run this after adding to library
def get_description(key):
    key = key
    url = f"https://openlibrary.org{key}.json"
    response = requests.get(url)
    data = response.json()
    desc = data["description"]
    return desc