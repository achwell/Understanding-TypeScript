let userInput: unknown
let userName: string
userInput = 5
userInput = "Axel"
if (typeof userInput === "string") {
    userName = userInput
}

function generateError(message: string, code: number): never {
    throw {message, errorCode: code}
}

let never = generateError("An error occured", 500);
console.log({never})