#se instala en el cmd 
##pip install confluent-kafk
config = {
    "bootstrap.servers":"pkc-6ojv2.us-west4.gcp.confluent.cloud:9092",
    "security.protocol":"SASL_SSL",
    "sasl.mechanisms":"PLAIN",
    "sasl.username":"ETWJCYVAYWFGSEWW",
    "sasl.password":"uBWqlr3qH5VNoGIphjPV9H7fcZWBRv9VCSMBJH+UFQbyYlk/hIsjKvJAg/qWyBo4",
    "session.timeout.ms":"45000"

}
from confluent_kafka import Consumer 
import json

props = config
props["group.id"] = "python-group-1"
props["auto.offset.reset"] = "earliest"

consumer = Consumer(props)
consumer.subscribe(["topico_randon_personas"])
try:
    while True:
      msg = consumer.poll(1.0)
      if msg is not None and msg.error() is None:
         #print("key = {key:12} value = {value:12}".format(key=msg.key().decode('utf-8'), value=msg.value().decode('utf-8')))
         #print(len(msg.value()))
         lista_valores = []
         #print(msg.value())
         json_str = msg.value()

         data = json.loads(json_str)
         

         #print(lista_valores)
         #print(type(msg.value()[0]))
         #print(msg.value()[1])

         #print(type(msg.value()[0]))
         #print(msg.value()[0])
         print(data)
    
except KeyboardInterrupt:
  pass
finally:
        consumer.close()

## se intala en cmd
#pip install "pymongo[srv]"

