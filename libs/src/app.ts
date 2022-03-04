import _ from 'lodash'
import "reflect-metadata"
import { plainToClass } from "class-transformer"
import { validate } from 'class-validator'
import { Product } from "./product.module"

declare var GLOBAL: any

console.log(_.shuffle([1, 2, 3]))
console.log(GLOBAL)

const products = [{ title: "A Crapet", price: 20.99 }, { title: "Another Book", price: 10.99 }]

const p1 = new Product("A Book", 12.99)

const loadedProducts = products.map(prod => plainToClass(Product, prod))

loadedProducts.push(p1)

const newProduct = new Product("", -5.99)

validate(newProduct).then(errors => {
    if (errors.length > 0) {
        console.log(errors)
    } else {
        console.log(newProduct.getInformation())
    }
})

loadedProducts.forEach(p => console.log(p.getInformation()))