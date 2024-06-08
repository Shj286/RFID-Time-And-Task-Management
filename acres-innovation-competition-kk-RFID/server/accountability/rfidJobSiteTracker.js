const LocationTrackerDatabase = require ('../database/LocationTrackerDatabase')
const TaskTrackerDatabase = require('../database/TaskTrackerDatabase')
const HashActionsController = require('../HashActions/HashActionsController')
exports.RFIDJobSiteTracker = class RFIDJobSiteTracker {

    static receiveInput(data){
        const id = Date.now() + Math.random() + 1 + Date.now()
        LocationTrackerDatabase[id] = data
    }

    static listRFIDData(){
        return Object.values(LocationTrackerDatabase)
    }

    // Used for the read ardruino
    static inputToActions(input){
        const employee = HashActionsController.getHashToEmployee(input)
        console.log("inputToActions: Employee",employee)
        if(employee && !LocationTrackerDatabase[employee['email']]){
            // Badge Employee in
            LocationTrackerDatabase[employee['email']] = {
                badgeIn: Date.now(),
                badgeOut:null
            }
        }else if(employee && LocationTrackerDatabase[employee['email']]){
            LocationTrackerDatabase[employee['email']]['badgeOut']  = Date.now()
        }

        const task = HashActionsController.getHashToTask(input)

        if(task){
            // mark a task completed
            if(!TaskTrackerDatabase[task['taskID']]['completed']){
                TaskTrackerDatabase[task['taskID']]['completed'] = Date.now()
            }
            else{
                console.log('YYYYY task ',task)

                TaskTrackerDatabase[task['taskID']]['badgeOut']  = Date.now()
            }
        }
    }
}