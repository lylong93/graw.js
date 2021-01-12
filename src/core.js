/**
 *  parse html to object
 */

// import  acorn from "acorn"

//递归
const tree =[]
const recursion = (root) => {
    tree.push(root)
    if(root.children) {
        // console.log(root.children)
        Array.from(root.children).forEach(element => {
            recursion(element)
        });
    }
}
const htmlParse = (root) => {
    recursion(root)
    tree.map(item => {
        console.log('offsetLeft',item.offsetLeft)
        console.log('offsetWidth',item.offsetWidth)
        // console.log(window.getComputedStyle(item).getPropertyValue("width"))
    })
    return '123'
}

console.log('tree',tree)

export  {htmlParse}