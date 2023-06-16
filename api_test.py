#pip install requests
import requests
import time

url = 'https://randomuser.me/api/'


contador = 0
while contador <= 10:
    time.sleep(3)
    print("paso un segundo")
    response = requests.get(url)
    print(response.status_code)
    print("  -----  ")
    print("    ")
    print("    ")
    print(response.json())
    contador = contador + 1
    

