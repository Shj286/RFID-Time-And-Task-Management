const LocationTrackerDatabase = require ('../database/LocationTrackerDatabase')
exports.RFIDJobSiteTracker = class RFIDJobSiteTracker {

    static receiveInput(data){
        const id = Date.now() + Math.random() + 1 + Date.now()
        LocationTrackerDatabase[id] = data
    }

    static listRFIDData(){
        return Object.values(LocationTrackerDatabase)
    }
}