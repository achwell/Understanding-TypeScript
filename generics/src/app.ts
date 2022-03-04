const names: Array<string> = []
const promise = new Promise<string>((resolve, reject) => {
    setTimeout(() => resolve("this is done!"), 2000)
    if (false) reject("Faen")
})
promise.then(response => console.log({ response }))

const merge = <T extends object, U extends object>(objA: T, objB: U) => {
    return Object.assign(objA, objB)
}

const mergedObj = merge({ name: "Axel", hobbies: ["Ølbrygging", "Matlaging"] }, { age: 55 })

console.log({ mergedObj })

interface Lenthy {
    length: number
}

const countAndDescirbe = <T extends Lenthy>(element: T): [T, string] => {
    let description = "Got no value"
    if (element.length === 1) {
        description = "Got one element"
    } else if (element.length > 1) {
        description = "Got " + element.length + " elements"
    }
    return [element, description]
}

console.log(countAndDescirbe("Hi, there!"))
console.log(countAndDescirbe(["Hi, there!"]))

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
    return "Value: " + obj[key]
}
console.log(extractAndConvert({ name: "Axel" }, "name"))

class DataStorage<T> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return
        }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>()
textStorage.addItem("Max")
textStorage.addItem("Manu")
console.log({ textStorage })

const numberStorage = new DataStorage<number>()
numberStorage.addItem(3.14)
console.log({ numberStorage })

const combinedStorage = new DataStorage<number | string>()
combinedStorage.addItem(3.14)
combinedStorage.addItem("Max")
console.log({ combinedStorage })

const objectStorage = new DataStorage<object>()
objectStorage.addItem({ name: "Max" })
objectStorage.addItem({ name: "Manu" })
objectStorage.removeItem({ name: "Manu" })
console.log({ objectStorage })

interface CourseGoal {
    title: string
    description: string
    completeUntil: Date
}

const createCourseGoal = (title: string, description: string, date: Date) => {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal
}

const namesArray: Readonly<string[]> = ["Max", "Anna"]
