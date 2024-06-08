const { SerialPort,ReadlineParser } = require('serialport');
const { RFIDJobSiteTracker } = require('../accountability/rfidJobSiteTracker');
const ArdruinoDataInterface = require('./ardruinoDataInterface');


// Create a port
const port = new SerialPort({
  path: "COM4",
  baudRate: 9600,
})
// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
  })



// Create an empty buffer to store the incoming data
let buffer = Buffer.alloc(0);
const endMarker = '$';

port.on('data', (data) => {
  buffer = Buffer.concat([buffer, data]);

  const endMarkerIndex = buffer.indexOf(endMarker);
  if (endMarkerIndex !== -1) {
    const receivedData = buffer.slice(0, endMarkerIndex).toString("utf8");
    const decryptedData = ArdruinoDataInterface.readFromTag(receivedData)
    console.log("decryptedData Data received: " + decryptedData);
      ArdruinoDataInterface.outputData = decryptedData;
      RFIDJobSiteTracker.inputToActions(decryptedData)

    // Reset the buffer
    buffer = buffer.slice(endMarkerIndex + 1);
  }
});
