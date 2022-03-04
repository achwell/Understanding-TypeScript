let favoriteActivities: string[]
favoriteActivities = ["Ølbrygging", "Musikk"]

enum Role {
    ADMIN = 5, READ_ONLY, AUTHOR
}

const person: {
    name: string,
    age: number,
    hobbies: string[],
    roleTuplet: [number, Role]
    role: Role
} = {
    name: "Axel",
    age: 55,
    hobbies: favoriteActivities,
    roleTuplet: [2, Role.AUTHOR],
    role: Role.READ_ONLY
}

console.log(person)

person.roleTuplet.push(Role.READ_ONLY)

person.hobbies.forEach(hobby => console.log(hobby.toUpperCase()))