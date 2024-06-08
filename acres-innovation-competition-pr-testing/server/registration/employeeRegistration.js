const EmployeeDatabase = require("../database/EmployeeDatabase")

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
       this.hasEmployee(newUser.employeeID)
        if(EmployeeDatabase[newUser.employeeID]){
            throw new Error("This employee already exists")
        }

       EmployeeDatabase[newUser.employeeID] = {
        ...newUser,
        password:newUser.password,
        creationDate:Date.now()
       } 
    }

    static logInEmployee(employeeID,password){

        this.hasEmployee(employeeID)

       const employee =  EmployeeDatabase[employeeID]
       
       const {password:employeePassword} = employee;
       if(employeePassword === password){
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

 


}
