/**
 *  parse html to object
 */

import  acorn from "acorn"

//递归
const tree =[]
const recursion = (root) => {
    tree.push(root)
    if(root.children) {
        console.log(root.children)
        Array.from(root.children).forEach(element => {
            recursion(element)
        });
    }
}
const htmlParse = (root) => {
    console.log('root',root.children)
    recursion(root)
    return '123'
}
console.log('tree',tree)
export  {htmlParse}