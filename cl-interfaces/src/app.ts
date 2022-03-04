type AddFn = (a: number, b: number) => number
//interface AddFn {(a: number, b: number): number }

let add: AddFn
add = (n1, n2) => n1 + n2

interface Named {
    readonly name?: string
    outputName?: string
}

interface Greetable extends Named {

    greet(phrase: string): void
}

class Person implements Greetable {

    name?: string

    constructor(public n: string, private age: number) {
        if (n) {
            this.name = n
        }
    }

    greet(phrase: string): void {
        if (this.name) {
            console.log(phrase + " " + this.name + " and I am " + this.age + " years old")
        } else {
            console.log("Hi!")
        }
    }

}

let user1: Greetable
user1 = new Person("Axel", 55)

user1.greet("Hi, there! I am ")
console.log({ user1 })