const TaskTrackerDatabase = require('../database/TaskTrackerDatabase')

module.exports = class TaskTracker{
    static createTask(email,title,descripton,managerEmail,task){
        const timestamp = Date.now()
        const id = timestamp + Math.random() + 1 + timestamp
        TaskTrackerDatabase[id] = {
            email,
            title,
            descripton,
            managerEmail,
            task,
            createdAt:timestamp,
            completed:null
        }
    }
    static getTaskByUser(email){
         let currentUserTask = null;
        const reverTask = this.listTasks()
        for(let i = 0; i < reverTask.length; i++){
            if(reverTask[i].email === email){
                currentUserTask = reverTask[i]
                break;
            }
        }
        return currentUserTask
    }
    static listTasks(){
        return  Object.values(TaskTrackerDatabase).reverse()
    }
}