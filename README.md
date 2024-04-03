# MQTT PUBLISHER 
This package provides an easy-to-use and customizable MQTT client for communication with MQTT servers.

# .ENV EXAMPLE
MQTT_PORT=1883

MQTT_HOST=localhost

MQTT_USER=user

MQTT_PASSWORD=password

MQTT_CLIENT_ID=123456789

MQTT_CLEAN=true

MQTT_CLIENT_TIMEOUT=4000

MQTT_RECONNECT_PERIOD=1000

MQTT_KEEP_ALIVE=60

MQTT_ENV=dev

# PACKAGE.JSON
If you want to load it as an ES module add "type": "module" in your package.json

# EXAMPLE 
<img width="683" alt="image" src="https://github.com/Xavier-Eyraud/mqtt-publisher/assets/45338343/30709031-9288-4bd7-adfb-7b4c56540698">

# TOPIC NAMES
The topic name consists of the environment variable MQTT_ENV with a hyphen and the name of the method called.

For example if your environment is "dev", and we use the "debug" method, the message will be sent to the "dev-debug" topic.
