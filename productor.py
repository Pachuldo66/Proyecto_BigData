## Se intala en el cmd de python
##pip install confluent-kafka

config = {
    "bootstrap.servers":"pkc-6ojv2.us-west4.gcp.confluent.cloud:9092",
    "security.protocol":"SASL_SSL",
    "sasl.mechanisms":"PLAIN",
    "sasl.username":"ETWJCYVAYWFGSEWW",
    "sasl.password":"uBWqlr3qH5VNoGIphjPV9H7fcZWBRv9VCSMBJH+UFQbyYlk/hIsjKvJAg/qWyBo4",
    "session.timeout.ms":"45000"

}

from confluent_kafka import Producer
producer = Producer(config)
producer.produce("topico_ss", key="key", value="value")

# producer.produce("topico_api_comida", key="key", value="https://api.untappd.com/v4/method_name?client_id=CLIENTID&client_secret=CLIENTSECRET")