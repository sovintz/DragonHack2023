#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <PubSubClient.h>
#include <stdio.h>
#include <stdlib.h>

#define TRUE (1 == 1)
#define FALSE (!TRUE)

// ------------------------------------------------------------------
// SERIAL COMMUNICATION DEFINITIONS    SERIAL COMMUNICATION DEFINITIONS
// ------------------------------------------------------------------

// remove comment for debugging
#define DEBUG

// serial interface enabled if DEBUG is active
#ifdef DEBUG
#define SERIAL_BEGIN(x) (Serial.begin(x))
#define PRINTLN(x) (Serial.println(x))
#define PRINT(x) (Serial.print(x))
#else
#define SERIAL_BEGIN(x)
#define PRINTLN(x)
#define PRINT(x)
#endif


// ------------------------------------------------------------------
// FUNCTION DECLARATIONS    FUNCTION DECLARATIONS    FUNCTION DECLARATIONS
// ------------------------------------------------------------------
void generateTopics();


// ------------------------------------------------------------------
// PINS    PINS    PINS    PINS    PINS    PINS    PINS    PINS
// ------------------------------------------------------------------

// used pins of micro controller definitions
int lidPin = D7;    // Lid sensor
int trigPin = D6;    // Trigger
int echoPin = D5;    // Echo

// ------------------------------------------------------------------
// GLOBAL VARIABLES    GLOBAL VARIABLES     GLOBAL VARIABLES
// ------------------------------------------------------------------

// credentials
# define SSID "OnePlus 6"
# define PASS "oneplus6=7"
# define DEVICE_NAME "Bin1"
byte MQTT[4] = {192, 168, 26, 64};
char macAddress[18];

// measurment variables
float dist = 0;
long duration;
int lidOpen, lidPrevious;
# define READ_DELAY 5000
# define AVG_TRIES 1

// MQTT variables
char topicDist[90];
char topicBattery[90];
char topicLid[90];
char topicStatus[90];
char msg[50] __attribute__((aligned(4)));
const int CONNECTION_RETRY_DELAY = 10000;

// Library variables
WiFiClient wifiClient;
PubSubClient pubSubClient(wifiClient);

// ---------------------------------------------------------------------------------------------------------------------------------
// PROGRAM CODE START    PROGRAM CODE START    PROGRAM CODE START    PROGRAM CODE START    PROGRAM CODE START    PROGRAM CODE START
// ---------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------
// GENERATE TOPIC    GENERATE TOPIC    GENERATE TOPIC
// ------------------------------------------------------------------

// generate MQTT topic strings
// BinBrain/*deviceName*/DIST -> send distance value
// BinBrain/*deviceName*/BATTERY -> send battery value
// BinBrain/*deviceName*/STATUS -> handle device status (ONLINE/OFFLINE)
// *deviceName* is a placeholder for specific topics
void generateTopics() {

    // build topic prefix
    strcpy(topicStatus, "BinBrain/");
    strcat(topicStatus, DEVICE_NAME);

    // build topic suffix
    strcpy(topicDist, topicStatus);
    strcpy(topicBattery, topicStatus);
    strcpy(topicLid, topicStatus);
    strcat(topicDist, "/DIST");
    strcat(topicLid, "/LID");
    strcat(topicBattery, "/BATTERY");
    strcat(topicStatus, "/STATUS");

    PRINTLN(topicDist);
    PRINTLN(topicBattery);
    PRINTLN(topicLid);
    PRINTLN(topicStatus);
}


// ------------------------------------------------------------------
// RECONNECT    RECONNECT    RECONNECT    RECONNECT    RECONNECT
// ------------------------------------------------------------------

// build string of devices mac address
// code copied from <ESP8266WiFi> to remove usage of STRING
void generateMacAddress() {
    uint8_t mac[6];
    wifi_get_macaddr(STATION_IF, mac);

    sprintf(macAddress, "%02X:%02X:%02X:%02X:%02X:%02X", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

    PRINT("MAC: ");
    PRINTLN(macAddress);
}

void connectToMqtt() {

    PRINT("Trying to connect to MQTT server...");

    // Build client id from MAC address
    char clientID[31];
    strcpy(clientID, "BinBrain-Client-");
    strcat(clientID, macAddress);
    PRINTLN(clientID);

    // Attempt to connect
    if (pubSubClient.connect(clientID, topicStatus, 0, TRUE, "OFFLINE")) {
        PRINTLN("connected");

        // publish status = connected to broker
        pubSubClient.publish(topicStatus, "ONLINE", TRUE);
    }else{

#ifdef DEBUG
        PRINT("FAILED, reason: ");

        // reason for unsuccessful connection
        switch (pubSubClient.state()) {
            case -4:
                PRINT("MQTT_CONNECTION_TIMEOUT");
                break;
            case -3:
                PRINT("MQTT_CONNECTION_LOST");
                break;
            case -2:
                PRINT("MQTT_CONNECT_FAILED");
                break;
            case -1:
                PRINT("MQTT_DISCONNECTED");
                break;

            case 1:
                PRINT("MQTT_CONNECT_BAD_PROTOCOL");
                break;

            case 2:
                PRINT("MQTT_CONNECT_BAD_CLIENT_ID");
                break;

            case 3:
                PRINT("MQTT_CONNECT_UNAVAILABLE");
                break;

            case 4:
                PRINT("MQTT_CONNECT_BAD_CREDENTIALS");
                break;

            case 5:
                PRINT("MQTT_CONNECT_UNAUTHORIZED");
                break;
        }

        PRINT(" (");
        PRINT(pubSubClient.state());
        PRINTLN(")");
        PRINTLN("Try again in 10 seconds");
#endif
    }
}


// ------------------------------------------------------------------
// CALLBACK    CALLBACK    CALLBACK    CALLBACK    CALLBACK
// ------------------------------------------------------------------
void callback(char *topic, const byte *payload, unsigned int length) {
    PRINT("Message arrived [");
    PRINT(topic);
    PRINTLN("] ");

    // topic for starting setup mode
    /*if (!strcmp(topic, topicSetup) && payload[0] == '1') {
        PRINTLN("SETUP REQUESTED");
        hostAP();
    }*/
}


// ------------------------------------------------------------------
// SETUP    SETUP    SETUP    SETUP    SETUP    SETUP    SETUP
// ------------------------------------------------------------------

// setup HADIS device on startup
void setup() {
    SERIAL_BEGIN(9600);

    //Define inputs and outputs
    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    pinMode(lidPin, INPUT_PULLUP);

    // turn off built in led
    digitalWrite(LED_BUILTIN, HIGH);

    // connect to wifi & setup MQTT server data
    WiFi.mode(WIFI_STA);
    WiFi.hostname("BinBrain");
    WiFi.begin(SSID, PASS);
    pubSubClient.setServer(MQTT, 1883);
    pubSubClient.setCallback(callback);

    // build device specific MQTT topics
    generateTopics();

    // build device's mac address string
    generateMacAddress();

    delay(1000);
}

// -------------------------------------------------------------------
// READ SENSOR    I2C SENSOR    I2C SENSOR    I2C SENSOR    I2C SENSOR
// -------------------------------------------------------------------
void avgDist() {
    
    dist = 0;
    for (int i = 0; i < AVG_TRIES; i++) {
      dist += readDist();
    }

    dist /= AVG_TRIES;

    PRINT("dist: ");
    PRINTLN(dist);
}

float readDist(){
    // The sensor is triggered by a HIGH pulse of 10 or more microseconds.
    // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
    digitalWrite(trigPin, LOW);
    delayMicroseconds(5);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
 
    // Read the signal from the sensor: a HIGH pulse whose
    // duration is the time (in microseconds) from the sending
    // of the ping to the reception of its echo off of an object.
    pinMode(echoPin, INPUT);
    duration = pulseIn(echoPin, HIGH);
  
    // Convert the time into a distance
    return (duration/2) * 0.343;     // Divide by 29.1 or multiply by 0.0343  
}


// ------------------------------------------------------------------
// MAIN LOOP    MAIN LOOP    MAIN LOOP    MAIN LOOP    MAIN LOOP
// ------------------------------------------------------------------
unsigned int previousReconnectTryTime = 0;
unsigned int previousReadTime = 0;

// main device operation loop
void loop() {

    // check for connection to MQTT broker & try to reconnect every CONNECTION_RETRY_DELAY ms
    if (!pubSubClient.connected()) {
        if (millis() - previousReconnectTryTime >= CONNECTION_RETRY_DELAY) {
            connectToMqtt();
            previousReconnectTryTime = millis();
        }
    } else {
        pubSubClient.loop();
    }

    lidOpen = digitalRead(lidPin);

    // publish measurement every READ_DELAY ms
    if (millis() - previousReadTime >= READ_DELAY || (!lidOpen && lidPrevious)) {
        avgDist();

        dtostrf(dist, 6, 2, msg);
        //PRINTLN(msg);
        pubSubClient.publish(topicDist, msg, TRUE);

        dtostrf(lidOpen, 1, 0, msg);
        pubSubClient.publish(topicLid, msg, TRUE);

        PRINT("lid: ");
        PRINTLN(lidOpen);

        previousReadTime = millis();
    }

    lidPrevious = lidOpen;
}