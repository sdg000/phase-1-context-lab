function createEmployeeRecord(employeeInfo){
    //takes arg (employeeInfo) and return array with corresponding properties.
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData){
    // takes in employee data, pass to createEmployeeRecord() to create array of actual employees
    return employeeData.map(function(employeeInfo){
        return createEmployeeRecord(employeeInfo)
    })
}

function createTimeInEvent(timeStamp){
    // take timeStamp as arg, create and update new obj with timeStamp arg
    let newRecord = {
        type: "TimeIn",
        hour: parseInt(timeStamp.split(" ")[1], 10), /*YYYY-MM-DD HHMM : parseInt/ split seperates hour from date, and change to value to int*/
        date: timeStamp.split(" ")[0]
    }
    //copy timeInEvent array to this function using spread operator and update with newRecord
    this.timeInEvents = [...this.timeInEvents, newRecord]
    return this
}

function createTimeOutEvent(timeStamp){
    // take timeStamp as arg, create and update new obj with timeStamp arg
    let newRecord = {
        type: "TimeOut",
        hour: parseInt(timeStamp.split(" ")[1], 10), /*YYYY-MM-DD HHMM : parseInt/ split seperates hour from date, and change to value to int*/
        date: timeStamp.split(" ")[0]
    }
    //copy timeOutEvent array to this function using spread operator and update with newRecord
    this.timeOutEvents = [...this.timeOutEvents, newRecord]
    return this
}

function hoursWorkedOnDate(date){
    //takes a date as arg, search timeInEvents array and returns first date element that match date arg passed, save to startHour variable
    const startHour = this.timeInEvents.find(function(event){
    return event.date === date
    })

    //takes a date as arg, search timeOutEvents array and returns first date element that match date arg passed, save to endHour variable
    const endHour = this.timeOutEvents.find(function(event){
        return event.date === date
    })
    return (endHour.hour - startHour.hour) / 100
}

function wagesEarnedOnDate(date){
    //takes date as arg, Pass to hoursWorkedOnDate to determine total hours worked, multiply by payPerHour and save to amtOwed variable
    const amtOwed = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return parseFloat(amtOwed)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    // lookup firstnames in source array and return firstName that matches firsttName parameter.  
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}

function calculatePayroll(employeeRecordsArray){
    //takes an array of all employee records as arg

    let costOfAllEmployeeWages = 0 /*set initial cost of all employee wages to 0*/

    //loop through all employeeRecordsArray, for each record in array, call allWagesFor() to calculate wage and add running total to employeeRecordsArray
    for(let i = 0; i < employeeRecordsArray.length; i++){
        costOfAllEmployeeWages += allWagesFor.call(employeeRecordsArray[i])
    }
    return costOfAllEmployeeWages
}