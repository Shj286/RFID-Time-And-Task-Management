const ArdruinoDataInterface = require('../ardruinoControllers/ardruinoDataInterface')
const LocationTrackerDatabase = require('../database/LocationTrackerDatabase')
const TaskTrackerDatabase = require('../database/TaskTrackerDatabase')
const HashActionsController = require('../HashActions/HashActionsController')
const { EmployeeRegistration } = require('../registration/employeeRegistration')

module.exports = class TaskTracker{
    static createTask(data){
        const timestamp = Date.now()
        const id = timestamp + Math.random() + 1 + timestamp
        TaskTrackerDatabase[id] = {
            email:data.email,
            title:data.title,
            taskID:id,
            description:data.description,
            managerEmail:data.managerEmail,
            task:data.task,
            createdAt:timestamp,
            completed:null,
            ...data
        }
       const hashedTask =  HashActionsController.mapHashToTask(id)

       //Push the task on the ardruino
       ArdruinoDataInterface.inputData = hashedTask
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

    static getTaskByEmail(email){
        const result = []
        this.listTasks().forEach((task)=>{
            if(task && task['email'] === email)result.push(task)
        })
    return result
    }
    static generateReport(){
        const tasks =  this.listTasks()

        return tasks.map((data,index)=>{
            const {email,title,description,managerEmail,task,createdAt,completed,project:{createdAt:projectDate,name,site}} = data
            
            const employee = EmployeeRegistration.getEmployeeByEmail(email)


            var badgeIn;
            try{
             badgeIn = timestampToHourFormat(LocationTrackerDatabase[email]['badgeIn'])
            }catch(err){
                badgeIn = timestampToHourFormat(null)
            }

            var badgeOut ;
            try{
             badgeOut = timestampToHourFormat(LocationTrackerDatabase[email]['badgeOut'])
            }catch(err){
                badgeOut = timestampToHourFormat(null)
            }
            return [employee['employeeID'], employee['firstName'],employee['lastName'],site,badgeIn,badgeOut,task, timestampToHourFormat(completed)]
        })
    }

    static generateHistogramByEmail(email){
       const employee = EmployeeRegistration.getEmployeeByEmail(email)

       const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const output = [
            {employee: `${employee['firstName']} ${employee['lastName']}`, clockIn: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0,Saturday:0,Sunday:0 }}
        ]

       const tasks =  this.getTaskByEmail(email)
       for(let i = 0; i < tasks.length; i++){
        const date = new Date(tasks[i]['createdAt']);
        const dayOfWeek = date.getDay();
        const dayName = weekday[dayOfWeek];
        output[0]['clockIn'][dayName] = output[0]['clockIn'][dayName] + diffHour(tasks[i]['createdAt'],tasks[i]['completed'])

       }
       return output
    }
}

function diffHour(t1,t2){
    if(!t1 || !t2)return 0

    const date1 = new Date(t1);
    const date2 = new Date(t2);
    
    const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    const differenceInMinutes = Math.round(differenceInMilliseconds / (1000 * 60));
    return differenceInMinutes
}

function timestampToHourFormat(timestamp){
    if(!timestamp)return "N/A"
    const date = new Date(timestamp);
    return  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}