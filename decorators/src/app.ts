function Logger(logString: string) {
    console.log("LOGGER FACTORY")
    return function (_: Function) {
        console.log(logString)
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY")
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super(args)
                console.log("Rendering template")
                const element = document.getElementById(hookId)
                if (element) {
                    element.innerHTML = template
                    element.querySelector("h1")!.textContent = this.name
                }
            }
        }
    }
}

function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator")
    console.log({ target, propertyName })
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator")
    console.log({ target, name, descriptor })

}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log("Method decorator")
    console.log({ target, name, descriptor })
    return {

    }
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter decorator")
    console.log({ target, name, position })
}

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
    name = "Max"
    constructor() {
        console.log("Creating Person object")
    }
}
const person = new Person()
console.log({ person })

class Product {

    @Log
    title: string
    private _price: number

    @Log2
    set price(price: number) {
        if (price > 0) {
            this._price = price
        } else {
            throw new Error("Invalid Price - should be positive!")
        }
    }

    constructor(title: string, price: number) {
        this.title = title
        this._price = price
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}

const p1 = new Product("Book", 19)
const p2 = new Product("Book 2", 29)

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor
}

class Printer {
    message = "This Works!"

    @Autobind
    showMessage() {
        console.log(this.message)
    }
}

const p = new Printer()

const button = document.querySelector("button")!
button.addEventListener("click", p.showMessage)

interface ValidatorConfig {
    [property: string]: {
        [validatableProperty: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }
}

function validate(obj: any): boolean {
    let isValid = true
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    if (objValidatorConfig) {
        for (const prop in objValidatorConfig) {
            console.log({ prop })
            for (const validator of objValidatorConfig[prop]) {
                switch (validator) {
                    case "required":
                        isValid = isValid && !!obj[prop]
                        break
                    case "positive":
                        isValid = isValid && obj[prop] > 0
                        break
                }
            }
        }
    }
    return isValid
}

class Course {

    @Required
    title: string

    @PositiveNumber
    price: number

    constructor(title: string, price: number) {
        this.title = title
        this.price = price
    }
}

const courseForm = document.querySelector("form")!
courseForm.addEventListener("submit", event => {
    event.preventDefault()
    const titleEl = document.getElementById("title") as HTMLInputElement
    const priceEl = document.getElementById("price") as HTMLInputElement

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price)

    if (!validate(createdCourse)) {
        alert("Invalid value")
        return
    }
    console.log(createdCourse)

})