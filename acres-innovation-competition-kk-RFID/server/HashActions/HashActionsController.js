const EmployeeDatabase = require("../database/EmployeeDatabase");
const HashActionsDatabase = require("../database/HashActionsDatabase");
const TaskTrackerDatabase = require("../database/TaskTrackerDatabase");
const { generateUniqueString } = require("../utils")

module.exports = class HashActionsController{

    static mapHashToEmployee(employeeID){

       const key =  generateUniqueString(10);
       HashActionsDatabase[key] = {
           type:"Employee",
           data:employeeID
       }
       return key 
    }

    static mapHashToTask(taskID){

        const key =  generateUniqueString(10);
        HashActionsDatabase[key] = {
            type:"Task",
            data:taskID
        }
        return key
     }

     static getHashToEmployee(key){
        const data = HashActionsDatabase[key]
        try{
            if(data["type"] === "Employee"){
                return EmployeeDatabase[data['data']]
            }
        }catch(err){
            return null
        }
     }

     static getHashToTask(key){
        const data = HashActionsDatabase[key]

       try{
        if(data["type"] === "Task"){
            return TaskTrackerDatabase[data["data"]]
        }
       }catch(err){
        return null
       }
     }
}