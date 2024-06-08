const ArdruinoDataInterface = require("../ardruinoControllers/ardruinoDataInterface")
const EmployeeDatabase = require("../database/EmployeeDatabase")
const HashActionsController = require("../HashActions/HashActionsController")

exports.EmployeeRegistration = class EmployeeRegistration{

    /**
     * 
     * @param {object} newUser 
     * @param {string} newUser.firstName
     * @param {string} newUser.lastName
     * @param {string} newUser.email
     * @param {string} newUser.password
     * @param {string} newUser.employeeID
     */
    static createEmployee(newUser){
        if(EmployeeDatabase[newUser.employeeID]){
            throw new Error("This employee already exists")
        }

       EmployeeDatabase[newUser.employeeID] = {
        ...newUser,
        password:newUser.password,
        creationDate:Date.now()
       } 

       const hashedEmployee = HashActionsController.mapHashToEmployee(newUser.employeeID)
       //write to ardruino 
       ArdruinoDataInterface.inputData = hashedEmployee

    }

    static logInEmployee(employeeID,password){

        this.hasEmployee(employeeID)

       const employee =  EmployeeDatabase[employeeID]
       
       const {password:employeePassword} = employee;
       if(employeePassword === password){
        ArdruinoDataInterface.inputData = employeeID
        return employee
       }else{
        throw new Error("Unauthorized Access");
       }
    }


    static updateEmployeePassword(employeeID,password,newPassword){

        this.hasEmployee(employeeID)

       const employee =  EmployeeDatabase[employeeID]
       const {password:employeePassword} = employee;

       if(employeePassword === password){

        EmployeeDatabase[employeeID]['password'] = newPassword

       }else{

        throw new Error("Invalid Password");

       }
    }


    /**
     * @private
     * @param {string} employeeID 
     */
    static hasEmployee(employeeID){
        const employee =  EmployeeDatabase[employeeID]
       if(!employee){
        throw new Error("This Employee ID does not exist")
       }
    }

    /**
     * 
     * @return {{firstName:string,lastName:string,email:string,employeeID:string}}  
     */
    static getEmployeeByEmail(email){
        let result;
        const employees = Object.values(EmployeeDatabase)
        for(let i = 0; i < employees.length; i++){
            if(employees[i]['email'] === email){
                result= employees[i];
                break;
            }
        }
        return result
    }

 


}
