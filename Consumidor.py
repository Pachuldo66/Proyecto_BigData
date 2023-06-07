"""pip install confluent-kafka"""
config = {
    "bootstrap.servers":"pkc-6ojv2.us-west4.gcp.confluent.cloud:9092",
    "security.protocol":"SASL_SSL",
    "sasl.mechanisms":"PLAIN",
    "sasl.username":"ETWJCYVAYWFGSEWW",
    "sasl.password":"uBWqlr3qH5VNoGIphjPV9H7fcZWBRv9VCSMBJH+UFQbyYlk/hIsjKvJAg/qWyBo4",
    "session.timeout.ms":"45000"

}
"""from confluent_kafka import Consumer
import json"""

props = config
props["group.id"] = "python-group-1"
props["auto.offset.reset"] = "earliest"

consumer = Consumer(props)
consumer.subscribe(["topico_ss"])
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
         print(data['ordertime'])
    
except KeyboardInterrupt:
  pass
finally:
        consumer.close()

"""pip install "pymongo[srv]"""""
"""from pymongo import MongoClient"""
def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://cluster0.sqm88.mongodb.net/test"
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['db_datos_api']
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()

collection_name = dbname["user_1_items"]

item_1 = { 
  "_id" : "U1IT00001",
  "item_name" : "Blender",
  "max_discount" : "10%",
  "batch_number" : "RR450020FRG",
  "price" : 340,
  "category" : "kitchen appliance"
}

item_2 = {
  "_id" : "U1IT00002",
  "item_name" : "Egg",
  "category" : "food",
  "quantity" : 12,
  "price" : 36,
  "item_description" : "brown country eggs"
}
collection_name.insert_many([item_1,item_2])