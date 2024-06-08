const WorkSitesDatabase = require('../database/WorkSitesDatabase')

module.exports = class SitesTracker{
    static createSite(site){
        const timestamp = Date.now()
        WorkSitesDatabase[site.name] = {
            createdAt:timestamp,
            ...site
        }
    }
   
    static listSites(){
        return  Object.values(WorkSitesDatabase)
    }
}