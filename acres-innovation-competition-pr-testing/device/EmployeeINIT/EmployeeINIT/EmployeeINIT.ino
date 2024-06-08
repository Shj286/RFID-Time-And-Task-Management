#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN         5           // Configurable, see typical pin layout above
#define SS_PIN          53          // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

MFRC522::MIFARE_Key key;

byte dataBlock[16];
int temp;
int cerealsize;
/**
 * Initialize.
 */
void setup() {
    Serial.begin(9600); // Initialize serial communications with the PC
    SPI.begin();        // Init SPI bus
    mfrc522.PCD_Init(); // Init MFRC522 card

    // Prepare the key (used both as key A and as key B)
    // using FFFFFFFFFFFFh which is the default at chip delivery from the factory
    for (byte i = 0; i < 6; i++) {
        key.keyByte[i] = 0xFF;
    }
    

    for (int i = 0; i < 16; i++){
      dataBlock[i] = 0x00;
    }

    cerealsize=0;
}

/*
  Main loop.
*/

void loop() {
    // Making dataBlock
    if(Serial.available()>0){
      cerealsize = Serial.available();
      for(int i=0;i<cerealsize;i++){
        temp = Serial.read();
        dataBlock[i] = (byte)temp;
      }
    }
    byte sector         = 1;
    byte blockAddr      = 4;
    byte trailerBlock   = 7;
    MFRC522::StatusCode status;

    // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
    if ( ! mfrc522.PICC_IsNewCardPresent())
        return;

    // Select one of the cards
    if ( ! mfrc522.PICC_ReadCardSerial())
        return;


    // Write dataBlock to tag
    for(int i=0;i<cerealsize;i++){
      Serial.print(dataBlock[i]);
    }
    status = (MFRC522::StatusCode) mfrc522.MIFARE_Write(blockAddr, dataBlock, &cerealsize);

    // Halt PICC
    mfrc522.PICC_HaltA();
    // Stop encryption on PCD
    mfrc522.PCD_StopCrypto1();
}

void dump_byte_array(byte *buffer, byte bufferSize) {
    for (byte i = 0; i < bufferSize; i++) {
        Serial.print(buffer[i] < 0x10 ? " 0" : " ");
        Serial.print(buffer[i], HEX);
    }
}

void dumpToString(byte *buffer, byte addr){
    Serial.println(F("Data at block"));
    Serial.print(addr);
    Serial.print(F(" converted as UTF8:"));
    for(byte i = 0; i<16; i++){
      Serial.print(buffer[i] < 0x10?" 0":" ");
      Serial.print((char) buffer[i]);
    }
    Serial.println();
}