## Se intala en el cmd de python
##pip install confluent-kafka

import requests
import time
from confluent_kafka import Producer
import json

#Primera api
#pip install requests
config = {
    "bootstrap.servers":"pkc-6ojv2.us-west4.gcp.confluent.cloud:9092",
    "security.protocol":"SASL_SSL",
    "sasl.mechanisms":"PLAIN",
    "sasl.username":"ETWJCYVAYWFGSEWW",
    "sasl.password":"uBWqlr3qH5VNoGIphjPV9H7fcZWBRv9VCSMBJH+UFQbyYlk/hIsjKvJAg/qWyBo4",
    "session.timeout.ms":"45000"

}


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
    
    json_str = json.dumps(response.json())

    mesage_bytes = json_str.encode()

    

    producer = Producer(config)
    producer.produce("topico_randon_personas", key="key", value="mesage_bytes")
    

    contador = contador + 1









# producer.produce("topico_api_comida", key="key", value="https://api.untappd.com/v4/method_name?client_id=CLIENTID&client_secret=CLIENTSECRET")