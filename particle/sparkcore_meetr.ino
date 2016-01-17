// -----------------------------------
// Endpoint for IFTTT
// Made for Meetr
// DeltaHacksII
// -----------------------------------

// Servo library
Servo myservo;

int led1 = D1;
int led2 = D4;
int pos = 0; 

void setup()
{
    // Pin configuration
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);

    // Declare Cloud Function
    Spark.function("doorLock",ledToggle);
    
    // Attach servo to D0
    myservo.attach(A0); 
    
    // Init LEDS
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);

}

void loop()
{
   // Nothing to do here
}


int ledToggle(String command) {
    if (command=="unlock") {
        digitalWrite(led1,HIGH);
        delay(250);
        digitalWrite(led1,LOW);
        delay(250);
        digitalWrite(led1,HIGH);
        delay(250);
        digitalWrite(led1,LOW);
        delay(250);
        digitalWrite(led1,HIGH);
        delay(5000);
        digitalWrite(led1,LOW);
        return 1;
    } else if(command=="lock"){
        digitalWrite(led2,HIGH);
        delay(250);
        digitalWrite(led2,LOW);
        delay(250);
        digitalWrite(led2,HIGH);
        delay(250);
        digitalWrite(led2,LOW);
        delay(250);
        digitalWrite(led2,HIGH);
        delay(5000);
        digitalWrite(led2,LOW);
        return 0;
    }
    else {
        return -1;
    }
}
