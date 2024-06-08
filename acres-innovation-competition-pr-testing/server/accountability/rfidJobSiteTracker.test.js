
const {RFIDJobSiteTracker} = require('./rfidJobSiteTracker');
const LocationTrackerDatabase = require('../database/LocationTrackerDatabase')



    test("Add a single data point to the locationTracker Database",()=>{
        RFIDJobSiteTracker.receiveInput({"Tes":"yes"})
        expect(Object.keys(LocationTrackerDatabase).length).toEqual(1);
    })

    test("Add multiple data point of the same kind to the locationTracker Database",()=>{
        RFIDJobSiteTracker.receiveInput({"Tes":"yes"})
        RFIDJobSiteTracker.receiveInput({"Tes":"yes"})
        RFIDJobSiteTracker.receiveInput({"Tes":"yes"})
        expect(Object.keys(LocationTrackerDatabase).length).toEqual(4);

    })

