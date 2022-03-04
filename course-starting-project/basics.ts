function add(n1: number, n2: number, printResult: boolean, resultPhrase: string) {
    console.log(typeof n1)
    console.log(typeof n2)
    const result = n1 + n2
    if (printResult) {
        console.log(resultPhrase + result)
    } else {
        return result
    }
}

const number1 = 5
const number2 = 2.8
const printResult = true
const resultPhrase = "Result is: "

const number = add(number1, number2, printResult, resultPhrase)
console.log({number})