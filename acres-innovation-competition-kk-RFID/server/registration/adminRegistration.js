const EmployeeDatabase = require("../database/EmployeeDatabase")
const ManagersDatabase = require("../database/ManagersDatabase")

exports.ManagerRegistration = class ManagerRegistration{

    /**
     * 
     * @param {object} newUser 
     * @param {string} newUser.firstName
     * @param {string} newUser.lastName
     * @param {string} newUser.email
     * @param {string} newUser.password
     * @param {string} newUser.managerID
     */
    static createTeamManager(newUser){
       this.hasTeamManager(newUser.managerID)
        if(ManagersDatabase[newUser.managerID]){
            throw new Error("This employee already exists")
        }

       ManagersDatabase[newUser.managerID] = {
        ...newUser,
        password:newUser.password,
        creationDate:Date.now()
       } 
    }

    static logInTeamManager(managerID,password){

        this.hasTeamManager(managerID)

       const employee =  ManagersDatabase[managerID]
       
       const {password:employeePassword} = employee;
       if(employeePassword === password){
        return employee
       }else{
        throw new Error("Unauthorized Access");
       }
    }


    static updateTeamManagerPassword(managerID,password,newPassword){

        this.hasTeamManager(managerID)

       const employee =  ManagersDatabase[managerID]
       const {password:employeePassword} = employee;

       if(employeePassword === password){

        ManagersDatabase[managerID]['password'] = newPassword

       }else{

        throw new Error("Invalid Password");

       }
    }

    static deleteEmployee(managerID,employeeID){
        this.hasTeamManager(managerID)
        delete EmployeeDatabase[employeeID]
    }

    static listEmployees(){
        return Object.values(EmployeeDatabase)
    }


    /**
     * @private
     * @param {string} managerID 
     */
    static hasTeamManager(managerID){
        const manager =  ManagersDatabase[managerID]
       if(!manager){
        throw new Error("This Employee ID does not exist")
       }
       return true
    }


 


}
