/**
 *  parse html to object
 */

// import  acorn from "acorn"
import {g$} from './unit'
//递归
const tree =[]
const recursion = (root) => {
    tree.push(root)
    if(root.children) {
        Array.from(root.children).forEach(element => {
            recursion(element)
        });
    }
}
const htmlParse = (root) => {
    recursion(root)
    tree.map(item => {
        getDomProperty()
        console.log('offsetLeft',item.offsetLeft)
        console.log('offsetWidth',item.offsetWidth)
    })
    return '123'
}
// 获取dom属性
const getDomProperty=(el)=>{
    const {offsetLeft,offsetWidth} = g$(el)
}

export  {htmlParse}