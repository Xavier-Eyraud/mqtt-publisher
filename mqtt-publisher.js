import mqtt from "mqtt";
import dotenv from 'dotenv';

class MqttPublisher {

    #connectUrl;
    #options;
    #client;
    #environment;

    /**
     * Creates a new MQTT client instance.
     *
     * @constructor
     */
    constructor() {
        dotenv.config();
        this.#connectUrl = `mqtt://${process.env.MQTT_HOST || 'localhost'}:${process.env.MQTT_PORT || 1883}`;
        this.#options = {
            clientId: process.env.MQTT_CLIENT_ID || null,
            clean: process.env.MQTT_CLEAN || true,
            connectTimeout: process.env.MQTT_CLIENT_TIMEOUT || 4000,
            username: process.env.MQTT_USER || 'user',
            password: process.env.MQTT_PASSWORD || 'password',
            reconnectPeriod: process.env.MQTT_RECONNECT_PERIOD || 1000,
            keepalive: process.env.MQTT_KEEPALIVE || 60,
        };
        this.#client = null;
        this.#environment = process.env.MQTT_ENV || 'dev';
        console.log('MQTT client created for ' + this.#environment);
    }

    /**
     * Connects the client to the MQTT broker using the configured URL and options.
     *
     * @returns {Promise<void>} A promise that resolves when the connection is established
     *                          or rejects with an error.
     */
    async #connect() {
        console.log('Connecting to MQTT broker');
        try {
            this.#client = mqtt.connect(this.#connectUrl, this.#options);
            await new Promise((resolve, reject) => {
                this.#client.on('connect', () => {
                    console.log('Connected to MQTT broker');
                    resolve();
                });

                this.#client.on('error', (error) => {
                    reject(error);
                });
            });
        } catch (error) {
            console.error('Error during connection:', error);
        }
    }

    /**
     * Publishes a message to a given topic on the MQTT broker.
     *
     * @param {string} topic The topic to publish the message to.
     * @param {string} message The message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    async #publish(topic, message, qos = 0, retain = false) {
        if (!this.#client || !this.#client.connected) {
            await this.#connect();
        }
        try {
            await new Promise((resolve, reject) => {
                this.#client.publish(topic, message, { qos: qos, retain: retain}, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log('Message sent to ' + topic);
                        resolve(); 
                    }
                });
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    /**
     * Publishes a debug message to the MQTT broker using the pre-configured "debug" topic.
     *
     * @param {string} message The debug message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    debug(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'debug', message, qos, retain);
    }

    /**
     * Publishes an info message to the MQTT broker using the pre-configured "info" topic.
     *
     * @param {string} message The info message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    info(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'info', message, qos, retain);
    }

    /**
     * Publishes a notice message to the MQTT broker using the pre-configured "notice" topic.
     *
     * @param {string} message The notice message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    notice(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'notice', message, qos, retain);
    }

    /**
     * Publishes a warning message to the MQTT broker using the pre-configured "warning" topic.
     *
     * @param {string} message The warning message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    warning(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'warning', message, qos, retain);
    }

    /**
     * Publishes an error message to the MQTT broker using the pre-configured "error" topic.
     *
     * @param {string} message The error message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    error(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'error', message, qos, retain);
    }

    /**
     * Publishes a critical message to the MQTT broker using the pre-configured "critical" topic.
     *
     * @param {string} message The debug message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    critical(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'critical', message, qos, retain);
    }

    /**
     * Publishes an alert message to the MQTT broker using the pre-configured "alert" topic.
     *
     * @param {string} message The alert message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    alert(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'alert', message, qos, retain);
    }

    /**
     * Publishes an emergency message to the MQTT broker using the pre-configured "emergency" topic.
     *
     * @param {string} message The emergency message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    emergency(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'emergency', message, qos, retain);
    }

    /**
     * Publishes a usage message to the MQTT broker using the pre-configured "usage" topic.
     *
     * @param {string} message The usage message to be published.
     * @param {number} [qos=0] The Quality of Service level for the message (0, 1, or 2).
     * @param {boolean} [retain=false] Whether to retain the message on the broker.
     *
     * @returns {Promise<void>} A promise that resolves when the message is published or
     *                          rejects with an error.
     */
    usage(message, qos = 0, retain = false) {
        this.#publish(this.#environment + '-' + 'usage', message, qos, retain);
    }
}

const mqttPublisher = new MqttPublisher();
export { mqttPublisher as default }; 
