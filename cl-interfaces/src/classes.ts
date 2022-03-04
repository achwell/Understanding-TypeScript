abstract class Department {
    static fiscalYear = 2022

    private employees: string[] = []

    constructor(readonly id: string, public name: string) { }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    abstract describe(this: Department): void

    printEmployeeInformation() {
        console.log(this.employees.length)
        console.log(this.employees)
    }

    static createEmployee(name: string) {
        return { name }
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, "IT")
    }
    describe(this: Department): void {
        console.log('IT Department - ID: ' + this.id)
    }

}

class AccountingDepartment extends Department {

    private lastReport: string
    private static instance: AccountingDepartment

    private constructor(id: string, private reports: string[]) {
        super(id, "Accounting")
        this.lastReport = reports ? reports[0] : ""
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance
        }
        this.instance = new AccountingDepartment("1", [])
        return this.instance
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport
        }
        throw new Error("No report found")
    }
    set mostRecentReport(report: string) {
        if (!report) {
            throw new Error('Please pass in a valid value!')
        }
        this.addReport(report)
    }

    describe(this: Department): void {
        console.log('Accounting Department - ID: ' + this.id)
    }

    addReport(report: string) {
        this.reports.push(report)
        this.lastReport = report
    }

    getReports() {
        return this.reports
    }

    addEmployee(employee: string) {
        if (employee === "Max") {
            return
        }
        super.addEmployee(employee)
    }
}


const accounting = AccountingDepartment.getInstance()
accounting.addEmployee("Max")
accounting.addEmployee("Manu")
accounting.describe()
accounting.printEmployeeInformation()
accounting.addReport("Det gikk til hælvete!")
accounting.mostRecentReport = "Banan"
console.log({ accounting })
console.log(accounting.mostRecentReport)

const it = new ITDepartment("2", ["Steve Jobs"])
it.printEmployeeInformation()
console.log({ it })
it.describe()

// const accountingCopy = { describe: accounting.describe, name: "Accounting Copy" }
// accountingCopy.describe()
// console.log({ accountingCopy })