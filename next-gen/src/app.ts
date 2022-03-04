//const userName = "Max"
// userName = "Maximillian"
// let age = 30
// age = 29

// var result

// //function add(a:number, b:number){
// //    result = a+b
// //    return result
// //}
// //console.log(result)

// if (age > 20) {
//     var isOld = true
// }
// //console.log(isOld)
// const add = (a: number, b: number = 0) => a + b
// const printOut: (a: string | number) => void = output => console.log(output)

// printOut(add(5, 2))
// printOut(add(6))

// const button = document.querySelector("button")
// if (button) {
//     button.addEventListener("click", event => console.log({ event }))
// }

const hobbies = ["Ølbrygging", "Matlaging"]
const activeHobbies = ["Musikk"]
activeHobbies.push(...hobbies)

console.log({ activeHobbies })


const person = {
    firstName: 'Max',
    age: 30
};

const copiedPerson = { ...person }

console.log({ copiedPerson })

const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue
    }, 0)
}
const addedNumbers = add(5, 10, 15, 17, 1, 3.14)

console.log({ addedNumbers })

const [hobby1, hobby2, ...rest] = activeHobbies
console.log({ hobby1, hobby2, rest })

const { age, firstName: userName } = person

console.log({ userName, age })