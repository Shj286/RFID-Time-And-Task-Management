#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN         5           // Configurable, see typical pin layout above
#define SS_PIN          53          // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

MFRC522::MIFARE_Key key;

byte dataBlock[16];
int cerealsize;

void setup() {
    Serial.begin(9600); // Initialize serial communications with the PC
    SPI.begin();        // Init SPI bus
    mfrc522.PCD_Init(); // Init MFRC522 card

    for (byte i = 0; i < 6; i++) {
        key.keyByte[i] = 0xFF; // Set default key
    }

    for (int i = 0; i < 16; i++) {
        dataBlock[i] = 0x00; // Initialize data block
    }

    cerealsize = 0;
}

void loop() {
    if (Serial.available() > 0) {
        cerealsize = Serial.available();
        for (int i = 0; i < cerealsize; i++) {
            dataBlock[i] = Serial.read(); // Read data from Serial and store in dataBlock
        }
        
        byte sector         = 1;
        byte blockAddr      = 4;
        byte trailerBlock   = 7;
        byte size           = 16;
        MFRC522::StatusCode status;

        if (!mfrc522.PICC_IsNewCardPresent()) return;

        if (!mfrc522.PICC_ReadCardSerial()) return;

        status = (MFRC522::StatusCode) mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_B, trailerBlock, &key, &(mfrc522.uid));
        
        if (status != MFRC522::STATUS_OK) {
            Serial.print(F("PCD_Authenticate() failed: "));
            Serial.println(mfrc522.GetStatusCodeName(status));
            return;
        } else {
            Serial.println("Authentication successful");
        }

        status = (MFRC522::StatusCode) mfrc522.MIFARE_Write(blockAddr, dataBlock, size);
        
        if (status != MFRC522::STATUS_OK) {
            Serial.print(F("MIFARE_Write failed: "));
            Serial.println(mfrc522.GetStatusCodeName(status));
            return;
        } else {
            Serial.println("Data written to RFID tag successfully");
        }

        mfrc522.PICC_HaltA();
        mfrc522.PCD_StopCrypto1();
    }
}