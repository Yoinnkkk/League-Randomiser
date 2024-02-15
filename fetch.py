import requests, json, time

url = 'https://cdn.communitydragon.org/latest/champion'


with open('./champions.json', encoding="utf8") as f:
    data = json.loads(f.read())['data']
    i = 1
    for champion in data:
        print(f"Current processing {i} / {len(data)}: {champion}")
        img_data = requests.get(f"{url}/{champion}/square").content
        with open(f'images/squares/{champion}.png', 'wb') as handler:
            handler.write(img_data)
        time.sleep(2)
        i+=1